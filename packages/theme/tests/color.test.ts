import { describe, test, expect } from "vitest";
import * as color from "@/color";

describe("exported color functions", () => {
  test("apply correct ANSI codes", async () => {
    const pairs: [string, string, string][] = [
      ["red", "\u001b[31m", "\u001b[39m"],
      ["bold", "\u001b[1m", "\u001b[22m"],
      ["bgBlue", "\u001b[44m", "\u001b[49m"],
      ["greenBright", "\u001b[92m", "\u001b[39m"],
    ];

    for (const [name, open, close] of pairs) {
      const fn = (color as any)[name];
      const out = fn("Hi");
      expect(out.startsWith(open)).toBe(true);
      expect(out.endsWith(close)).toBe(true);
    }
  });
});
