import { describe, expect, test, vi, beforeEach } from "vitest";
import * as prompt from "@/prompt";
import * as raw from "@/prompt/raw";
import { DEFAULT_THEME } from "@/color";

vi.mock("@/prompt/raw", () => ({
  readLine: vi.fn(),
  readKey: vi.fn(),
  clearLines: vi.fn(),
  cursorUp: vi.fn(),
}));

/**
 * Helpers to make async prompt loops deterministic.
 */
function mockReadLineQueue(values: string[]) {
  (raw.readLine as any).mockImplementation(() => {
    if (values.length === 0) {
      throw new Error("readLine called more times than expected");
    }
    return Promise.resolve(values.shift());
  });
}

function mockReadKeyQueue(values: string[]) {
  (raw.readKey as any).mockImplementation(() => {
    if (values.length === 0) {
      throw new Error("readKey called more times than expected");
    }
    return Promise.resolve(values.shift());
  });
}

describe("@/prompt", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prompt.setTheme(DEFAULT_THEME);
  });

  // --- text() ---

  test("text() returns user input", async () => {
    mockReadLineQueue(["hello"]);
    const res = await prompt.text({ message: "Enter:", default: "" });
    expect(res).toBe("hello");
  });

  test("text() throws if below minLength", async () => {
    mockReadLineQueue(["hi"]);
    await expect(
      prompt.text({ message: "Name", minLength: 3 }),
    ).rejects.toThrow("Must be at least 3 characters");
  });

  test("text() throws if above maxLength", async () => {
    mockReadLineQueue(["abcdef"]);
    await expect(
      prompt.text({ message: "Name", maxLength: 5 }),
    ).rejects.toThrow("Must be at most 5 characters");
  });

  test("text() throws if validate() returns false", async () => {
    mockReadLineQueue(["bad"]);
    await expect(
      prompt.text({
        message: "Validate",
        validate: () => false,
      }),
    ).rejects.toThrow();
  });

  // --- password() ---

  test("password() returns masked input", async () => {
    mockReadLineQueue(["secret"]);
    const result = await prompt.password({ message: "Enter password" });
    expect(result).toBe("secret");
  });

  test("password() confirm mismatch throws", async () => {
    mockReadLineQueue(["first", "second"]);
    await expect(
      prompt.password({ message: "Enter", confirm: true }),
    ).rejects.toThrow(/Passwords do not match/);
  });

  test("password() confirm match returns", async () => {
    mockReadLineQueue(["same", "same"]);
    const result = await prompt.password({ message: "Enter", confirm: true });
    expect(result).toBe("same");
  });

  // --- select() ---

  test("select() navigates and selects option", async () => {
    const options = [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
    ];

    mockReadKeyQueue(["down", "enter"]);

    const result = await prompt.select({
      message: "Pick one",
      options,
    });

    expect(result).toBe("b");
    expect(raw.clearLines).toHaveBeenCalled();
  });

  test("select() skips disabled option", async () => {
    const options = [
      { label: "A", value: "a", disabled: true },
      { label: "B", value: "b" },
    ];

    mockReadKeyQueue(["enter", "down", "enter"]);

    const result = await prompt.select({
      message: "Pick",
      options,
    });

    expect(result).toBe("b");
  });

  // --- multiselect() ---

  test("multiselect() selects multiple options", async () => {
    const options = [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
    ];

    mockReadKeyQueue(["space", "down", "space", "enter"]);

    const result = await prompt.multiselect({
      message: "Pick many",
      options,
    });

    expect(result).toEqual(["a", "b"]);
  });

  // --- confirm() ---

  test("confirm() returns true when user types y", async () => {
    mockReadLineQueue(["y"]);
    const result = await prompt.confirm({ message: "Proceed?" });
    expect(result).toBe(true);
  });

  test("confirm() returns false when user types n", async () => {
    mockReadLineQueue(["n"]);
    const result = await prompt.confirm({ message: "Proceed?" });
    expect(result).toBe(false);
  });

  test("confirm() uses default when input empty", async () => {
    mockReadLineQueue([""]);
    const result = await prompt.confirm({
      message: "Proceed?",
      default: true,
    });
    expect(result).toBe(true);
  });

  // --- editor() ---

  test("editor() returns entered text (fallback path)", async () => {
    mockReadLineQueue(["hello world"]);
    const res = await prompt.editor({ message: "Edit" });
    expect(res).toBe("hello world");
  });

  test("editor() throws if required and empty", async () => {
    mockReadLineQueue(["   "]);
    await expect(
      prompt.editor({ message: "Edit", required: true }),
    ).rejects.toThrow("Input required.");
  });

  // --- search() ---

  test("search() returns match when only one remains", async () => {
    const options = [
      { label: "apple", value: 1 },
      { label: "banana", value: 2 },
    ];

    mockReadLineQueue(["app"]);

    const result = await prompt.search({
      message: "Search",
      options,
    });

    expect(result).toBe(1);
  });
});
