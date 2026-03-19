import type { InputMapEntry } from "../command";

export interface ParseResult {
  positional: string[];
  flags: Map<string, string | boolean>;
}

export interface Parser {
  parse(
    argv: string[],
    inputMap: Map<string | number, InputMapEntry>,
  ): ParseResult | Promise<ParseResult>;
  capabilities: {
    subCommands: boolean;
    longFlags?: { prefix: string; valueSeparators: string[] } | false;
    shortFlags?: { prefix: string; valueSeparators: string[] } | false;
  };
}

export function positional(): Parser {
  return {
    parse(argv) {
      return {
        positional: argv,
        flags: new Map(),
      };
    },

    capabilities: {
      subCommands: true,
      longFlags: false,
      shortFlags: false,
    },
  };
}

export * from "./windows";
export * from "./unix";
