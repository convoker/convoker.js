export interface ParseResult {
  positional: string[];
  flags: Map<string, string | boolean>;
}

export interface Parser {
  parse(argv: string[]): ParseResult | Promise<ParseResult>;
  capabilities: {
    subCommands: boolean;
    longFlags?: { prefix: string; valueSeparators: string[] } | false;
    shortFlags?: { prefix: string; valueSeparators: string[] } | false;
  };
}

export * from "./windows";
export * from "./unix";
