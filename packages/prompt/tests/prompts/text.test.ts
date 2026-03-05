import { describe, it, expect, vi, beforeEach } from "vitest";
import { PassThrough } from "node:stream";
import textPrompt from "@/prompts/text";
import { PromptValidationError } from "@/core/error";

function createMockIO() {
  const input = new PassThrough() as any;
  const output = new PassThrough() as any;

  input.setEncoding = vi.fn();
  input.resume = vi.fn();
  input.pause = vi.fn();
  input.removeAllListeners = vi.fn(input.removeAllListeners.bind(input));

  output.write = vi.fn();

  return { input, output };
}

describe("text prompt", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("writes the message to output", async () => {
    const { input, output } = createMockIO();

    const promise = textPrompt({
      message: "Your name?",
      input,
      output,
    });

    expect(output.write).toHaveBeenCalledWith("Your name? ");

    input.emit("data", "John\n");
    await promise;
  });

  it("resolves with trimmed input", async () => {
    const { input } = createMockIO();

    const promise = textPrompt({
      message: "Name?",
      input,
    });

    input.emit("data", "  Alice  \n");

    await expect(promise).resolves.toBe("Alice");
  });

  it("uses default when input is empty", async () => {
    const { input } = createMockIO();

    const promise = textPrompt({
      message: "Name?",
      default: "Anonymous",
      input,
    });

    input.emit("data", "\n");

    await expect(promise).resolves.toBe("Anonymous");
  });

  it("throws PromptValidationError if below minLength", async () => {
    const { input } = createMockIO();

    const promise = textPrompt({
      message: "Name?",
      minLength: 5,
      input,
    });

    input.emit("data", "abc\n");

    await expect(promise).rejects.toBeInstanceOf(PromptValidationError);
  });

  it("throws PromptValidationError if above maxLength", async () => {
    const { input } = createMockIO();

    const promise = textPrompt({
      message: "Name?",
      maxLength: 3,
      input,
    });

    input.emit("data", "abcd\n");

    await expect(promise).rejects.toBeInstanceOf(PromptValidationError);
  });

  it("runs custom validate function (true)", async () => {
    const { input } = createMockIO();

    const promise = textPrompt({
      message: "Name?",
      validate: (value) => value === "ok",
      input,
    });

    input.emit("data", "ok\n");

    await expect(promise).resolves.toBe("ok");
  });

  it("rejects when validate returns false", async () => {
    const { input } = createMockIO();

    const promise = textPrompt({
      message: "Name?",
      validate: () => false,
      input,
    });

    input.emit("data", "bad\n");

    await expect(promise).rejects.toBeInstanceOf(PromptValidationError);
  });

  it("supports async validate returning transformed value", async () => {
    const { input } = createMockIO();

    const promise = textPrompt({
      message: "Name?",
      validate: (value) => value.toUpperCase(),
      input,
    });

    input.emit("data", "john\n");

    await expect(promise).resolves.toBe("JOHN");
  });

  it("clears prompt on done when clearPromptOnDone is true", async () => {
    const { input, output } = createMockIO();

    const promise = textPrompt({
      message: "Name?",
      clearPromptOnDone: true,
      input,
      output,
    });

    input.emit("data", "John\n");
    await promise;

    expect(output.write).toHaveBeenCalledWith("\x1Bc");
  });

  it("aborts when signal is aborted", async () => {
    const { input } = createMockIO();
    const controller = new AbortController();

    const promise = textPrompt({
      message: "Name?",
      input,
      signal: controller.signal,
    });

    controller.abort();

    await expect(promise).rejects.toThrow("Prompt aborted");
  });

  it("pauses input and removes listeners after done", async () => {
    const { input } = createMockIO();

    const promise = textPrompt({
      message: "Name?",
      input,
    });

    input.emit("data", "John\n");
    await promise;

    expect(input.pause).toHaveBeenCalled();
  });
});
