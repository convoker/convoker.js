import type { Parser } from ".";

export function unix(preset = gnu()): Parser {
  return {
    parse(argv) {
      const positional: string[] = [];
      const flags = new Map<string, string | boolean>();

      // TODO

      return { positional, flags };
    },

    capabilities: {
      subCommands: true,
      longFlags: preset.allowLongFlags
        ? { prefix: "--", valueSeparators: preset.valueSeparators }
        : false,
      shortFlags: { prefix: "-", valueSeparators: preset.valueSeparators },
    },
  };
}

export interface Preset {
  valueSeparators: [string, ...string[]];
  joinShortFlags: boolean;
  allowLongFlags: boolean;
}

export function gnu(): Preset {
  return {
    valueSeparators: [" ", "="],
    joinShortFlags: true,
    allowLongFlags: true,
  };
}

export function verbose(): Preset {
  return {
    valueSeparators: ["="],
    joinShortFlags: true,
    allowLongFlags: true,
  };
}

export function bsd(): Preset {
  return {
    valueSeparators: [""],
    joinShortFlags: true,
    allowLongFlags: false,
  };
}
