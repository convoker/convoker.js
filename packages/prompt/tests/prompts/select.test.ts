import { describe, it, expect, vi } from "vitest";
import { PassThrough } from "node:stream";
import select from "@/prompts/select";

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

describe("select prompt (single)", () => {
  it("selects initial option with return", async () => {
    const { input, output } = createMockTTY();

    const promise = select({
      message: "Pick one",
      input,
      output,
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "b" },
      ],
    });

    emitKey(input, "return");

    await expect(promise).resolves.toBe("a");
  });

  it("moves cursor down and selects option", async () => {
    const { input, output } = createMockTTY();

    const promise = select({
      message: "Pick one",
      input,
      output,
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "b" },
      ],
    });

    emitKey(input, "down");
    emitKey(input, "return");

    await expect(promise).resolves.toBe("b");
  });

  it("skips disabled options when moving", async () => {
    const { input, output } = createMockTTY();

    const promise = select({
      message: "Pick one",
      input,
      output,
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "b", disabled: true },
        { label: "C", value: "c" },
      ],
    });

    emitKey(input, "down"); // should skip B
    emitKey(input, "return");

    await expect(promise).resolves.toBe("c");
  });

  it("does not select disabled option on return", async () => {
    const { input, output } = createMockTTY();

    const promise = select({
      message: "Pick one",
      input,
      output,
      initialIndex: 1,
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "b", disabled: true },
        { label: "C", value: "c" },
      ],
    });

    emitKey(input, "return"); // disabled, should do nothing
    emitKey(input, "down");
    emitKey(input, "return");

    await expect(promise).resolves.toBe("c");
  });

  it("wraps around when navigating", async () => {
    const { input, output } = createMockTTY();

    const promise = select({
      message: "Pick one",
      input,
      output,
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "b" },
      ],
    });

    emitKey(input, "up"); // wrap to last
    emitKey(input, "return");

    await expect(promise).resolves.toBe("b");
  });
});

describe("select prompt (multiple)", () => {
  it("selects multiple options", async () => {
    const { input, output } = createMockTTY();

    const promise = select({
      message: "Pick many",
      input,
      output,
      multiple: true,
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "b" },
        { label: "C", value: "c" },
      ],
    });

    emitKey(input, "space"); // select A
    emitKey(input, "down");
    emitKey(input, "space"); // select B
    emitKey(input, "return");

    await expect(promise).resolves.toEqual(["a", "b"]);
  });

  it("respects initialIndex in multiple mode", async () => {
    const { input, output } = createMockTTY();

    const promise = select({
      message: "Pick many",
      input,
      output,
      multiple: true,
      initialIndex: 1,
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "b" },
        { label: "C", value: "c" },
      ],
    });

    emitKey(input, "return");

    await expect(promise).resolves.toEqual(["b"]);
  });

  it("does not toggle disabled options", async () => {
    const { input, output } = createMockTTY();

    const promise = select({
      message: "Pick many",
      input,
      output,
      multiple: true,
      options: [
        { label: "A", value: "a", disabled: true },
        { label: "B", value: "b" },
      ],
    });

    emitKey(input, "space"); // disabled, no-op
    emitKey(input, "down");
    emitKey(input, "space"); // select B
    emitKey(input, "return");

    await expect(promise).resolves.toEqual(["b"]);
  });

  it("toggles selection off if pressed twice", async () => {
    const { input, output } = createMockTTY();

    const promise = select({
      message: "Pick many",
      input,
      output,
      multiple: true,
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "b" },
      ],
    });

    emitKey(input, "space"); // select A
    emitKey(input, "space"); // deselect A
    emitKey(input, "return");

    await expect(promise).resolves.toEqual([]);
  });
});
