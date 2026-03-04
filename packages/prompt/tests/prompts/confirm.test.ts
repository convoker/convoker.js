import { describe, it, expect } from "vitest";
import { PassThrough } from "node:stream";
import confirm from "@/prompts/confirm";

function createMockIO() {
  const input = new PassThrough();
  const output = new PassThrough();

  // minimal TTY compatibility
  (input as any).setEncoding = () => {};
  (input as any).resume = () => {};
  (input as any).pause = () => {};

  return { input, output };
}

describe("confirm prompt", () => {
  it("resolves true on 'y'", async () => {
    const { input, output } = createMockIO();

    const promise = confirm({
      message: "Are you sure?",
      input: input as any,
      output: output as any,
    });

    input.emit("data", "y");

    await expect(promise).resolves.toBe(true);
  });

  it("resolves false on 'n'", async () => {
    const { input, output } = createMockIO();

    const promise = confirm({
      message: "Are you sure?",
      input: input as any,
      output: output as any,
    });

    input.emit("data", "n");

    await expect(promise).resolves.toBe(false);
  });

  it("uses default when pressing enter", async () => {
    const { input, output } = createMockIO();

    const promise = confirm({
      message: "Proceed?",
      default: true,
      input: input as any,
      output: output as any,
    });

    input.emit("data", "\n");

    await expect(promise).resolves.toBe(true);
  });

  it("respects custom labels", async () => {
    const { input, output } = createMockIO();

    const promise = confirm({
      message: "Delete file?",
      yesLabel: "Absolutely",
      noLabel: "Nope",
      input: input as any,
      output: output as any,
    });

    input.emit("data", "a");

    await expect(promise).resolves.toBe(true);
  });

  it("aborts on Ctrl+C", async () => {
    const { input, output } = createMockIO();

    const promise = confirm({
      message: "Abort test?",
      input: input as any,
      output: output as any,
    });

    input.emit("data", "\u0003");

    await expect(promise).rejects.toThrow("Prompt aborted");
  });

  it("calls validate if provided", async () => {
    const { input, output } = createMockIO();

    const promise = confirm({
      message: "Validate?",
      validate: (value) => value === true,
      input: input as any,
      output: output as any,
    });

    input.emit("data", "y");

    await expect(promise).resolves.toBe(true);
  });
});
