import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import Stream from "node:stream";

import {
  trace,
  info,
  warn,
  error,
  fatal,
  setConfig,
  setTheme,
  DEFAULT_CONFIG,
  WriteError,
} from "@/index";
import { DEFAULT_THEME, type Theme } from "@convoker/theme";

/**
 * Helper to create a writable stream we can control and inspect
 */
function createMockStream(writeImpl?: (chunk: any) => boolean) {
  const write = vi.fn(writeImpl ?? (() => true));

  const stream = {
    write,
  } as unknown as Stream.Writable;

  return { stream, write };
}

describe("log module", () => {
  let stdout: ReturnType<typeof createMockStream>;
  let stderr: ReturnType<typeof createMockStream>;
  let exitSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    stdout = createMockStream();
    stderr = createMockStream();

    setConfig({
      stdout: stdout.stream,
      stderr: stderr.stream,
      format: "text",
      jsonSpace: 2,
    });

    exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    }) as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("trace writes to stdout", () => {
    trace("hello");

    expect(stdout.write).toHaveBeenCalledTimes(1);
    expect(stderr.write).not.toHaveBeenCalled();

    const output = stdout.write.mock.calls[0]![0]!;
    expect(output).toContain("hello");
    expect(output).toContain("TRACE");
  });

  test("info writes to stdout", () => {
    info("world");

    expect(stdout.write).toHaveBeenCalledTimes(1);
    expect(stderr.write).not.toHaveBeenCalled();

    const output = stdout.write.mock.calls[0]![0]!;
    expect(output).toContain("world");
    expect(output).toContain("INFO");
  });

  test("warn writes to stderr and applies warning theme", () => {
    warn("be careful");

    expect(stderr.write).toHaveBeenCalledTimes(1);
    expect(stdout.write).not.toHaveBeenCalled();

    const output = stderr.write.mock.calls[0]![0]!;
    expect(output).toContain("be careful");
    expect(output).toContain("WARN");
  });

  test("error writes to stderr", () => {
    error("something broke");

    expect(stderr.write).toHaveBeenCalledTimes(1);
    expect(stdout.write).not.toHaveBeenCalled();

    const output = stderr.write.mock.calls[0]![0]!;
    expect(output).toContain("something broke");
    expect(output).toContain("ERROR");
  });

  test("fatal writes to stderr and exits process", () => {
    expect(() => fatal("boom")).toThrow("process.exit called");

    expect(stderr.write).toHaveBeenCalledTimes(1);
    expect(stdout.write).not.toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(-1);

    const output = stderr.write.mock.calls[0]![0]!;
    expect(output).toContain("boom");
    expect(output).toContain("FATAL");
  });

  test("throws WriteError when stdout.write returns false", () => {
    stdout = createMockStream(() => false);

    setConfig({
      stdout: stdout.stream,
      stderr: stderr.stream,
    });

    expect(() => info("nope")).toThrow(WriteError);
    expect(() => info("nope")).toThrow(/stdout/);
  });

  test("throws WriteError when stderr.write returns false", () => {
    stderr = createMockStream(() => false);

    setConfig({
      stdout: stdout.stream,
      stderr: stderr.stream,
    });

    expect(() => warn("nope")).toThrow(WriteError);
    expect(() => warn("nope")).toThrow(/stderr/);
  });

  test("supports json format output", () => {
    setConfig({
      format: "json",
      stdout: stdout.stream,
      stderr: stderr.stream,
    });

    info({ a: 1 });

    const output = stdout.write.mock.calls[0]![0]!;
    const parsed = JSON.parse(output);

    expect(parsed).toMatchObject({
      level: "INFO",
      message: JSON.stringify({ a: 1 }, null, DEFAULT_CONFIG.jsonSpace),
    });
    expect(parsed.timestamp).toBeTypeOf("string");
  });

  test("setTheme overrides the current theme", () => {
    const customTheme: Theme = {
      ...DEFAULT_THEME,
      info: (s: string) => `INFO(${s})`,
    };

    setTheme(customTheme);
    info("custom");

    const output = stdout.write.mock.calls[0]![0]!;
    expect(output).toContain("INFO(");
    expect(output).toContain("custom");
  });
});
