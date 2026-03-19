import type { Parser } from ".";

export function windows(): Parser {
  return {
    parse(argv) {
      const positional: string[] = [];
      const flags = new Map<string, string | boolean>();

      // TODO

      return { positional, flags };
    },

    capabilities: {
      subCommands: true,
      longFlags: { prefix: "/", valueSeparators: ":" },
      shortFlags: { prefix: "/", valueSeparators: ":" },
    },
  };
}
