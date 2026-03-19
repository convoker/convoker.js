import type { Parser } from ".";

export function keyValue(): Parser {
  return {
    parse(argv) {
      const flags = new Map<string, string | boolean>();
      for (const arg of argv) {
        const [key, ...values] = arg.split("=") as [string, ...string[]];
        const value = values.join("=");

        if (value === "true") flags.set(key, true);
        else if (value === "false") flags.set(key, false);
        else flags.set(key, value);
      }

      return { flags, positional: [] };
    },

    capabilities: {
      subCommands: false,
      longFlags: { prefix: "", valueSeparators: ["="] },
      shortFlags: false,
    },
  };
}
