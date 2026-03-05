import { describe, it, expect, vi } from "vitest";
import { PassThrough } from "node:stream";
import search from "@/prompts/search";

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

describe("search prompt (single)", () => {
  it("selects first filtered result", async () => {
    const { input, output } = createMockTTY();

    const promise = search({
      message: "Search",
      input,
      output,
      options: [
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Cherry", value: "cherry" },
      ],
    });

    emitKey(input, "a"); // query: "a"
    emitKey(input, "return");

    await expect(promise).resolves.toBe("apple");
  });

  it("filters options based on query", async () => {
    const { input, output } = createMockTTY();

    const promise = search({
      message: "Search",
      input,
      output,
      options: [
        { label: "Dog", value: "dog" },
        { label: "Cat", value: "cat" },
        { label: "Mouse", value: "mouse" },
      ],
    });

    emitKey(input, "c"); // should match "Cat"
    emitKey(input, "return");

    await expect(promise).resolves.toBe("cat");
  });

  it("respects minQueryLength", async () => {
    const { input, output } = createMockTTY();

    const promise = search({
      message: "Search",
      input,
      output,
      minQueryLength: 2,
      options: [
        { label: "Alpha", value: "a" },
        { label: "Beta", value: "b" },
      ],
    });

    emitKey(input, "a"); // too short
    emitKey(input, "return");

    // Should not resolve yet — add another char
    emitKey(input, "l");
    emitKey(input, "return");

    await expect(promise).resolves.toBe("a");
  });

  it("supports custom filter function", async () => {
    const { input, output } = createMockTTY();

    const promise = search({
      message: "Search",
      input,
      output,
      filter: (query, option) =>
        option.label.toLowerCase().startsWith(query.toLowerCase()),
      options: [
        { label: "Foo", value: "foo" },
        { label: "Bar", value: "bar" },
      ],
    });

    emitKey(input, "b");
    emitKey(input, "return");

    await expect(promise).resolves.toBe("bar");
  });

  it("skips disabled filtered options", async () => {
    const { input, output } = createMockTTY();

    const promise = search({
      message: "Search",
      input,
      output,
      options: [
        { label: "Alpha", value: "a", disabled: true },
        { label: "Alpine", value: "b" },
      ],
    });

    emitKey(input, "a");
    emitKey(input, "return");

    await expect(promise).resolves.toBe("b");
  });

  it("supports arrow navigation in filtered list", async () => {
    const { input, output } = createMockTTY();

    const promise = search({
      message: "Search",
      input,
      output,
      options: [
        { label: "Alpha", value: "a" },
        { label: "Alpine", value: "b" },
      ],
    });

    emitKey(input, "a");
    emitKey(input, "down");
    emitKey(input, "return");

    await expect(promise).resolves.toBe("b");
  });
});

describe("search prompt (multiple)", () => {
  it("selects multiple filtered options", async () => {
    const { input, output } = createMockTTY();

    const promise = search({
      message: "Search",
      input,
      output,
      multiple: true,
      options: [
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
      ],
    });

    emitKey(input, "e"); // matches Red + Green
    emitKey(input, "space"); // select Red
    emitKey(input, "down");
    emitKey(input, "space"); // select Green
    emitKey(input, "return");

    await expect(promise).resolves.toEqual(["red", "green"]);
  });

  it("toggles selection off", async () => {
    const { input, output } = createMockTTY();

    const promise = search({
      message: "Search",
      input,
      output,
      multiple: true,
      options: [
        { label: "One", value: 1 },
        { label: "Two", value: 2 },
      ],
    });

    emitKey(input, "o"); // match One
    emitKey(input, "space"); // select
    emitKey(input, "space"); // deselect
    emitKey(input, "return");

    await expect(promise).resolves.toEqual([]);
  });

  it("respects initialIndex in multiple mode", async () => {
    const { input, output } = createMockTTY();

    const promise = search({
      message: "Search",
      input,
      output,
      multiple: true,
      initialIndex: 1,
      options: [
        { label: "First", value: "first" },
        { label: "Second", value: "second" },
      ],
    });

    emitKey(input, "return");

    await expect(promise).resolves.toEqual(["second"]);
  });

  it("returns empty array if nothing selected", async () => {
    const { input, output } = createMockTTY();

    const promise = search({
      message: "Search",
      input,
      output,
      multiple: true,
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "b" },
      ],
    });

    emitKey(input, "return");

    await expect(promise).resolves.toEqual([]);
  });
});
