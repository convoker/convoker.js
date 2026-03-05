import { describe, it, expect, vi, beforeEach } from "vitest";
import { createPrompt, PromptValidationError } from "@/core";

type Function = (...args: unknown[]) => unknown;

// Mock getTheme
vi.mock("@/prompt/core/theme", () => ({
  getTheme: vi.fn(() => ({ name: "mock-theme" })),
}));

function createMockStream() {
  const listeners: Record<string, Function[]> = {};

  return {
    isTTY: true,
    setRawMode: vi.fn(),
    write: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    on: vi.fn((event: string, cb: Function) => {
      listeners[event] ??= [];
      listeners[event].push(cb);
    }),
    emit(event: string, ...args: any[]) {
      listeners[event]?.forEach((fn) => fn(...args));
    },
  };
}

describe("createPrompt (static)", () => {
  let input: any;
  let output: any;

  beforeEach(() => {
    input = createMockStream();
    output = createMockStream();
  });

  it("resolves when done is called", async () => {
    const prompt = createPrompt<number, any>((ctx) => {
      ctx.done(42);
    });

    await expect(prompt({ input, output })).resolves.toBe(42);
  });

  it("rejects when abort is called", async () => {
    const prompt = createPrompt<number, any>((ctx) => {
      ctx.abort();
    });

    await expect(prompt({ input, output })).rejects.toThrow("Prompt aborted");
  });

  it("clears screen when clearPromptOnDone is true", async () => {
    const prompt = createPrompt<string, any>((ctx) => {
      ctx.done("ok");
    });

    await prompt({
      input,
      output,
      clearPromptOnDone: true,
    });

    expect(output.write).toHaveBeenCalledWith("\x1Bc");
  });

  it("validates using function (true/false)", async () => {
    const prompt = createPrompt<string, any>(async (ctx) => {
      await ctx.validate("test");
      ctx.done("valid");
    });

    await expect(
      prompt({
        input,
        output,
        validate: (v: string) => v === "test",
      }),
    ).resolves.toBe("valid");

    const failingPrompt = createPrompt<string, any>(async (ctx) => {
      await ctx.validate("bad");
    });

    await expect(
      failingPrompt({
        input,
        output,
        validate: () => false,
      }),
    ).rejects.toBeInstanceOf(PromptValidationError);
  });

  it("validates using schema-style object", async () => {
    const mockSchema = {
      "~standard": {
        validate: vi.fn(async (value: string) => ({
          value: value.toUpperCase(),
        })),
      },
    };

    const prompt = createPrompt<string, any>(async (ctx) => {
      const result = await ctx.validate("abc");
      ctx.done(result);
    });

    await expect(
      prompt({
        input,
        output,
        validate: mockSchema,
      }),
    ).resolves.toBe("ABC");
  });

  it("handles AbortSignal", async () => {
    const controller = new AbortController();

    const prompt = createPrompt<number, any>(() => {
      setTimeout(() => controller.abort(), 0);
    });

    await expect(
      prompt({
        input,
        output,
        signal: controller.signal,
      }),
    ).rejects.toThrow("Prompt aborted");
  });
});
