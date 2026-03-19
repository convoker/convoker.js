import { describe, it, expect } from "vitest";
import { windows } from "@/parsers/windows";

describe("windows parser", () => {
  const parser = windows();

  it("parses positional arguments only", async () => {
    const result = await parser.parse(["foo", "bar"], new Map());

    expect(result.positional).toEqual(["foo", "bar"]);
    expect(result.flags.size).toBe(0);
  });

  it("parses boolean flags (no value)", async () => {
    const result = await parser.parse(["/help", "/verbose"], new Map());

    expect(result.positional).toEqual([]);
    expect(result.flags.get("help")).toBe(true);
    expect(result.flags.get("verbose")).toBe(true);
  });

  it("parses flags with values", async () => {
    const result = await parser.parse(["/out:dist", "/mode:prod"], new Map());

    expect(result.flags.get("out")).toBe("dist");
    expect(result.flags.get("mode")).toBe("prod");
  });

  it("parses flags with values containing colons", async () => {
    const result = await parser.parse(
      ["/url:https://example.com:8080"],
      new Map(),
    );

    expect(result.flags.get("url")).toBe("https://example.com:8080");
  });

  it("mixes positional args and flags", async () => {
    const result = await parser.parse(
      ["build", "/out:dist", "file.txt", "/watch"],
      new Map(),
    );

    expect(result.positional).toEqual(["build", "file.txt"]);
    expect(result.flags.get("out")).toBe("dist");
    expect(result.flags.get("watch")).toBe(true);
  });

  it("handles empty value after colon as boolean true", async () => {
    const result = await parser.parse(["/flag:"], new Map());

    expect(result.flags.get("flag")).toBe(true);
  });

  it("overwrites duplicate flags (last wins)", async () => {
    const result = await parser.parse(["/mode:dev", "/mode:prod"], new Map());

    expect(result.flags.get("mode")).toBe("prod");
  });

  it("returns capabilities correctly", () => {
    expect(parser.capabilities).toEqual({
      subCommands: true,
      longFlags: { prefix: "/", valueSeparators: [":"] },
      shortFlags: { prefix: "/", valueSeparators: [":"] },
    });
  });
});
