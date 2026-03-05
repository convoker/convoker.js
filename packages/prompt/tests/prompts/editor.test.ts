import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import editorPrompt from "@/prompts/editor";
import type { EditorOpts } from "@/prompts/editor";
import { PromptValidationError } from "@/core/error";

import * as fs from "node:fs/promises";
import * as child from "node:child_process";
import * as readline from "node:readline";
import { PassThrough } from "node:stream";

vi.mock("node:fs/promises");
vi.mock("node:child_process");
vi.mock("node:readline");

describe("editor prompt", () => {
  let input: PassThrough;
  let output: PassThrough;

  beforeEach(() => {
    input = new PassThrough();
    output = new PassThrough();

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function run(opts: Partial<EditorOpts> = {}) {
    return editorPrompt({
      input: input as any,
      output: output as any,
      ...opts,
    } as EditorOpts);
  }

  // -----------------------------
  // External editor mode
  // -----------------------------

  it("opens external editor and returns contents", async () => {
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);
    vi.mocked(fs.readFile).mockResolvedValue("hello world");
    vi.mocked(fs.unlink).mockResolvedValue(undefined);

    vi.mocked(child.spawn).mockReturnValue({
      on: (event: string, cb: any) => {
        if (event === "exit") cb(0);
      },
    } as any);

    const result = await run();

    expect(result).toBe("hello world");
    expect(child.spawn).toHaveBeenCalled();
    expect(fs.readFile).toHaveBeenCalled();
  });

  it("rejects if editor exits with error code", async () => {
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);
    vi.mocked(fs.unlink).mockResolvedValue(undefined);

    vi.mocked(child.spawn).mockReturnValue({
      on: (event: string, cb: any) => {
        if (event === "exit") cb(1);
      },
    } as any);

    await expect(run()).rejects.toThrow("Editor exited with code 1");
  });

  // -----------------------------
  // Inline mode
  // -----------------------------

  it("collects inline input", async () => {
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);
    vi.mocked(fs.unlink).mockResolvedValue(undefined);

    const mockAsyncIterator = async function* () {
      yield "line 1";
      yield "line 2";
      yield ""; // terminates
    };

    vi.mocked(readline.createInterface).mockReturnValue({
      [Symbol.asyncIterator]: mockAsyncIterator,
      close: vi.fn(),
    } as any);

    const result = await run({ inline: true });

    expect(result).toBe("line 1\nline 2");
  });

  // -----------------------------
  // Required
  // -----------------------------

  it("throws if required and empty", async () => {
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);
    vi.mocked(fs.readFile).mockResolvedValue("");
    vi.mocked(fs.unlink).mockResolvedValue(undefined);

    vi.mocked(child.spawn).mockReturnValue({
      on: (event: string, cb: any) => {
        if (event === "exit") cb(0);
      },
    } as any);

    await expect(run({ required: true })).rejects.toThrow("Input is required.");
  });

  // -----------------------------
  // validate()
  // -----------------------------

  it("applies custom validate function", async () => {
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);
    vi.mocked(fs.readFile).mockResolvedValue("abc");
    vi.mocked(fs.unlink).mockResolvedValue(undefined);

    vi.mocked(child.spawn).mockReturnValue({
      on: (event: string, cb: any) => {
        if (event === "exit") cb(0);
      },
    } as any);

    const result = await run({
      validate: (val) => val.toUpperCase(),
    });

    expect(result).toBe("ABC");
  });

  it("rejects when validate returns false", async () => {
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);
    vi.mocked(fs.readFile).mockResolvedValue("abc");
    vi.mocked(fs.unlink).mockResolvedValue(undefined);

    vi.mocked(child.spawn).mockReturnValue({
      on: (event: string, cb: any) => {
        if (event === "exit") cb(0);
      },
    } as any);

    await expect(
      run({
        validate: () => false,
      }),
    ).rejects.toBeInstanceOf(PromptValidationError);
  });

  // -----------------------------
  // Abort
  // -----------------------------

  it("aborts when signal triggers", async () => {
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);
    vi.mocked(fs.unlink).mockResolvedValue(undefined);

    const controller = new AbortController();

    const promise = run({
      signal: controller.signal,
    });

    controller.abort();

    await expect(promise).rejects.toThrow("Prompt aborted");
  });
});
