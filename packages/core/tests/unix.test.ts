import { describe, it, expect } from "vitest";
import { unix, gnu, verbose, bsd } from "@/parsers/unix";
import type { InputMapEntry } from "@/command";
import { i } from "@/index";
import type { Kind } from "@convoker/input";

function makeInputMap(entries: Record<string, Kind>) {
  const map = new Map<string | number, InputMapEntry>();
  for (const [key, value] of Object.entries(entries)) {
    map.set(key, { inputOption: i.option(value), inputKey: key });
  }
  return map;
}

describe("unix parser", () => {
  describe("positional arguments", () => {
    it("collects positional args", async () => {
      const parser = unix();
      const res = await parser.parse(["foo", "bar"], new Map());

      expect(res.positional).toEqual(["foo", "bar"]);
      expect(res.flags.size).toBe(0);
    });
  });

  describe("long flags (gnu preset)", () => {
    it("parses --flag=value", async () => {
      const parser = unix(gnu());
      const inputMap = makeInputMap({ foo: "string" });

      const res = await parser.parse(["--foo=bar"], inputMap);

      expect(res.flags.get("foo")).toBe("bar");
    });

    it("parses --flag value", async () => {
      const parser = unix(gnu());
      const inputMap = makeInputMap({ foo: "string" });

      const res = await parser.parse(["--foo", "bar"], inputMap);

      expect(res.flags.get("foo")).toBe("bar");
    });

    it("parses boolean long flags", async () => {
      const parser = unix(gnu());
      const inputMap = makeInputMap({ verbose: "boolean" });

      const res = await parser.parse(["--verbose"], inputMap);

      expect(res.flags.get("verbose")).toBe(true);
    });
  });

  describe("short flags", () => {
    it("parses single short flag", async () => {
      const parser = unix();
      const inputMap = makeInputMap({ a: "boolean" });

      const res = await parser.parse(["-a"], inputMap);

      expect(res.flags.get("a")).toBe(false); // Boolean(value) where value is undefined
    });

    it("parses joined short flags", async () => {
      const parser = unix();
      const inputMap = makeInputMap({
        a: "boolean",
        b: "boolean",
        c: "boolean",
      });

      const res = await parser.parse(["-abc"], inputMap);

      expect(res.flags.get("a")).toBe(false);
      expect(res.flags.get("b")).toBe(false);
      expect(res.flags.get("c")).toBe(false);
    });

    it("parses short flag with value using space", async () => {
      const parser = unix();
      const inputMap = makeInputMap({ a: "string" });

      const res = await parser.parse(["-a", "123"], inputMap);

      expect(res.flags.get("a")).toBe("123");
    });

    it("parses short flag with '=' separator", async () => {
      const parser = unix();
      const inputMap = makeInputMap({ a: "string" });

      const res = await parser.parse(["-a=123"], inputMap);

      expect(res.flags.get("a")).toBe("123");
    });
  });

  describe("mixed args", () => {
    it("handles flags and positional together", async () => {
      const parser = unix();
      const inputMap = makeInputMap({
        foo: "string",
        v: "boolean",
      });

      const res = await parser.parse(
        ["run", "--foo=bar", "-v", "file.txt"],
        inputMap,
      );

      expect(res.positional).toEqual(["run", "file.txt"]);
      expect(res.flags.get("foo")).toBe("bar");
      expect(res.flags.get("v")).toBe(false);
    });
  });

  describe("verbose preset", () => {
    it("only allows '=' separator", async () => {
      const parser = unix(verbose());
      const inputMap = makeInputMap({ foo: "string" });

      const res = await parser.parse(["--foo=bar"], inputMap);
      expect(res.flags.get("foo")).toBe("bar");
    });

    it("does not treat space as separator", async () => {
      const parser = unix(verbose());
      const inputMap = makeInputMap({ foo: "string" });

      const res = await parser.parse(["--foo", "bar"], inputMap);

      // "bar" should be positional because no space separator
      expect(res.flags.get("foo")).toBe("");
      expect(res.positional).toContain("bar");
    });
  });

  describe("bsd preset", () => {
    it("disables long flags", async () => {
      const parser = unix(bsd());
      const inputMap = makeInputMap({ foo: "string" });

      const res = await parser.parse(["--foo=bar"], inputMap);

      expect(res.flags).not.toHaveProperty("foo");
    });
  });

  describe("capabilities", () => {
    it("returns correct capabilities for gnu", () => {
      const parser = unix(gnu());

      expect(parser.capabilities.longFlags).toEqual({
        prefix: "--",
        valueSeparators: ["=", " "],
      });

      expect(
        parser.capabilities.shortFlags && parser.capabilities.shortFlags.prefix,
      ).toBe("-");
    });

    it("disables long flags in bsd", () => {
      const parser = unix(bsd());

      expect(parser.capabilities.longFlags).toBe(false);
    });
  });
});
