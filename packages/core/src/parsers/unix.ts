import type { Parser } from ".";

export function unix(preset = gnu()): Parser {
  return {
    parse(argv, inputMap) {
      const positional: string[] = [];
      const flags = new Map<string, string | boolean>();

      for (let i = 0; i < argv.length; i++) {
        const arg = argv[i]!;
        if (preset.allowLongFlags && arg.startsWith("--")) {
          const rawFlag = arg.slice(2);
          const inputEntry = inputMap.get(rawFlag);

          if (inputEntry?.inputOption.$kind !== "boolean") {
            let name = rawFlag;
            let value = "";
            for (const separator of preset.valueSeparators) {
              if (separator === " ") {
                name = rawFlag;
                value = argv[++i]!;
                break;
              }

              const [key, ...values] = rawFlag.split(separator) as [
                string,
                ...string[],
              ];
              name = key;
              value = values.join(separator);

              if (values.length !== 0) break;
            }

            flags.set(name, value);
          } else {
            flags.set(rawFlag, true);
          }
        } else if (arg.startsWith("-")) {
          let names: string[];
          if (preset.joinShortFlags) names = arg.slice(1).split("");
          else names = [arg.slice(1)];

          let value: string | undefined;

          const firstName = preset.joinShortFlags
            ? arg.slice(1)[0]!
            : arg.slice(1);

          const isBoolean =
            inputMap.get(firstName)?.inputOption.$kind === "boolean";

          for (const separator of preset.valueSeparators) {
            if (separator === " ") {
              if (!isBoolean) {
                value = argv[++i]!;
              }
              break;
            }

            const [, ...values] = arg.split(separator) as [string, ...string[]];
            value = values.join(separator);

            if (values.length !== 0) break;
          }

          for (const name of names) {
            if (inputMap.get(name)?.inputOption.$kind === "boolean")
              flags.set(name, Boolean(value));
            else flags.set(name, value ?? true);
          }
        } else {
          positional.push(arg);
        }
      }

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

export interface UnixPreset {
  valueSeparators: [string, ...string[]];
  joinShortFlags: boolean;
  allowLongFlags: boolean;
}

export function gnu(): UnixPreset {
  return {
    valueSeparators: ["=", " "],
    joinShortFlags: true,
    allowLongFlags: true,
  };
}

export function verbose(): UnixPreset {
  return {
    valueSeparators: ["="],
    joinShortFlags: true,
    allowLongFlags: true,
  };
}

export function bsd(): UnixPreset {
  return {
    valueSeparators: [""],
    joinShortFlags: true,
    allowLongFlags: false,
  };
}

export class UnixParserError extends Error {
  constructor(message: string) {
    super(message);
  }
}
