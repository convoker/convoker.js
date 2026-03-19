import type { Parser } from ".";

export function windows(): Parser {
  return {
    parse(argv) {
      const positional: string[] = [];
      const flags = new Map<string, string | boolean>();

      for (const arg of argv) {
        if (arg.startsWith("/")) {
          const [key, ...values] = arg.slice(1).split(":") as [
            string,
            ...string[],
          ];
          flags.set(key, values.join(":") || true);
        } else positional.push(arg);
      }

      return { positional, flags };
    },

    capabilities: {
      subCommands: true,
      longFlags: { prefix: "/", valueSeparators: [":"] },
      shortFlags: { prefix: "/", valueSeparators: [":"] },
    },
  };
}
