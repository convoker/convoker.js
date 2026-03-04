import { describe, it, expect, vi } from "vitest";
import { PassThrough } from "node:stream";
import password from "@/prompts/password";

function createMockTTY() {
  const input = new PassThrough() as any;
  const output = new PassThrough() as any;

  input.isTTY = true;
  input.setRawMode = vi.fn();
  output.write = vi.fn();

  return { input, output };
}

function emitKey(input: any, name: string, opts: any = {}) {
  input.emit("keypress", name, {
    name,
    ctrl: false,
    meta: false,
    shift: false,
    ...opts,
  });
}

describe("password prompt", () => {
  it("resolves typed password", async () => {
    const { input, output } = createMockTTY();

    const promise = password({
      message: "Password:",
      input,
      output,
    });

    emitKey(input, "a");
    emitKey(input, "b");
    emitKey(input, "c");
    emitKey(input, "return");

    await expect(promise).resolves.toBe("abc");
  });

  it("masks output", async () => {
    const { input, output } = createMockTTY();

    const promise = password({
      message: "Password:",
      input,
      output,
      mask: "#",
    });

    emitKey(input, "a");
    emitKey(input, "b");

    expect(output.write).toHaveBeenCalledWith(expect.stringContaining("##"));

    emitKey(input, "return");
    await promise;
  });

  it("supports confirmation", async () => {
    const { input, output } = createMockTTY();

    const promise = password({
      message: "Password:",
      input,
      output,
      confirm: true,
    });

    // first entry
    emitKey(input, "s");
    emitKey(input, "e");
    emitKey(input, "c");
    emitKey(input, "r");
    emitKey(input, "e");
    emitKey(input, "t");
    emitKey(input, "return");

    // confirm entry
    emitKey(input, "s");
    emitKey(input, "e");
    emitKey(input, "c");
    emitKey(input, "r");
    emitKey(input, "e");
    emitKey(input, "t");
    emitKey(input, "return");

    await expect(promise).resolves.toBe("secret");
  });

  it("rejects if confirmation does not match", async () => {
    const { input, output } = createMockTTY();

    const promise = password({
      message: "Password:",
      input,
      output,
      confirm: true,
    });

    emitKey(input, "a");
    emitKey(input, "b");
    emitKey(input, "c");
    emitKey(input, "return");

    emitKey(input, "x");
    emitKey(input, "y");
    emitKey(input, "z");
    emitKey(input, "return");

    await expect(promise).rejects.toBeInstanceOf(Error);
  });

  it("enforces minLength", async () => {
    const { input, output } = createMockTTY();

    const promise = password({
      message: "Password:",
      input,
      output,
      minLength: 5,
    });

    emitKey(input, "a");
    emitKey(input, "b");
    emitKey(input, "return");

    await expect(promise).rejects.toBeInstanceOf(Error);
  });
});
