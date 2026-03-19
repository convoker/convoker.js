import process from "node:process";

import { gray, cyan, bold, type Theme } from "@convoker/theme";
import { setTheme } from "@convoker/theme/global";
import {
  ConvokerError,
  HelpAskedError,
  MissingRequiredArgumentError,
  MissingRequiredOptionError,
  TooManyArgumentsError,
  UnknownOptionError,
} from "./error";
import {
  convert,
  Option,
  Positional,
  type InferInput,
  type Input,
} from "@convoker/input";
import { unix, type Parser } from "./parsers";

/**
 * What the command is an alias for.
 */
export interface CommandAlias<T extends Input = Input> {
  /**
   * A pointer to the command.
   */
  command: Command<T>;
  /**
   * The name of the command this is an alias for.
   */
  alias?: string;
}

/**
 * The result of the `Command.parse` function.
 */
export interface ValidatedParseResult<T extends Input> {
  /**
   * A pointer to the command to run.
   */
  command: Command<T>;
  /**
   * A pointer to all collected middlewares.
   */
  middlewares: MiddlewareFn<T>[];
  /**
   * The input to pass into the command.
   */
  input: InferInput<T>;
  /**
   * Errors collected during parsing.
   */
  errors: ConvokerError[];
  /**
   * If this should result in displaying the version of the command.
   */
  isVersion: boolean;
  /**
   * If this should result in displaying a help screen.
   */
  isHelp: boolean;
}

/**
 * Command action function.
 */
export type ActionFn<T extends Input> = (
  input: InferInput<T>,
) => any | Promise<any>;

/**
 * Command middleware function.
 */
export type MiddlewareFn<T extends Input = Input> = (
  input: InferInput<T>,
  next: () => Promise<any>,
) => any | Promise<any>;

/**
 * Command error handler.
 */
export type ErrorFn<T extends Input> = (
  command: Command<T>,
  errors: Error[],
  input: Partial<InferInput<T>>,
) => void | Promise<void>;

/**
 * Builder for commands.
 */
export type Builder = (c: Command<any>) => Command<any> | void;

/**
 * An input map entry.
 */
export interface InputMapEntry {
  /**
   * The key of the map entry.
   */
  inputKey: string;
  /**
   * The value of the map entry.
   */
  inputOption: Option<any, any, any> | Positional<any, any, any>;
}

/**
 * A command.
 */
export class Command<T extends Input = Input> {
  /**
   * The names (aliases) of this command.
   */
  $names: string[];
  /**
   * The description of this command.
   */
  $description: string | undefined;
  /**
   * The theme of this command
   */
  $theme: Theme | undefined;
  /**
   * The version of this command.
   */
  $version: string | undefined;
  /**
   * The children of this command.
   */
  $children: Map<string, CommandAlias> = new Map();
  /**
   * The parent of this command.
   */
  $parent: Command<any> | undefined;
  /**
   * If this command allows unknown options.
   */
  $allowUnknownOptions: boolean = false;
  /**
   * If you should be able to surpass the amount of positional arguments defined in the input.
   */
  $allowSurpassArgLimit: boolean = false;
  /**
   * The input this command takes.
   */
  $input: T = {} as T;
  /**
   * The action function of this command.
   */
  $fn: ActionFn<T> | undefined = undefined;
  /**
   * The middlewares associated with this command.
   */
  $middlewares: MiddlewareFn<T>[] = [];
  /**
   * The error handler of this command.
   */
  $errorFn: ErrorFn<T> | undefined = undefined;
  /**
   * The argument parser to use.
   */
  $parser: Parser | undefined;

  /**
   * Creates a new command.
   * @param names The names (aliases).
   * @param desc The description.
   * @param version The version.
   */
  constructor(names: string | string[], desc?: string, version?: string) {
    this.$names = Array.isArray(names) ? names : [names];
    this.$description = desc;
    this.$version = version;
  }

  /**
   * Adds a set of aliases to this command.
   * @param aliases The aliases to add.
   * @returns this
   */
  alias(...aliases: string[]): this {
    this.$names.push(...aliases);
    this.$parent?.add(this);
    return this;
  }

  /**
   * Adds a description to this command.
   * @param desc The description.
   * @returns this
   */
  description(desc: string): this {
    this.$description = desc;
    return this;
  }

  /**
   * Adds a version to this command.
   * @param version The version.
   * @returns this
   */
  version(version: string): this {
    this.$version = version;
    return this;
  }

  /**
   * Sets the input for this command.
   * @param input The input.
   * @returns this
   */
  input<TInput extends Input>(input: TInput): Command<TInput> {
    this.$input = input as any;
    return this as any;
  }

  /**
   * Adds a chain of middlewares.
   * @param fns The middlewares to use.
   * @returns this
   */
  use(...fns: MiddlewareFn<T>[]): this {
    this.$middlewares.push(...fns);
    return this;
  }

  /**
   * Sets the action function for this command.
   * @param fn The action.
   * @returns this
   */
  action(fn: ActionFn<T>): this {
    this.$fn = fn;
    return this;
  }

  /**
   * Sets the error function for this command.
   * @param fn The error handler.
   * @returns this
   */
  error(fn: ErrorFn<T>): this {
    this.$errorFn = fn;
    return this;
  }

  /**
   * Adds existing commands to this.
   * @param commands The commands.
   * @returns this
   */
  add(...commands: Command<any>[]): this {
    for (const command of commands) {
      command.$parent = this;
      const alias = { command, alias: command.$names[0] };
      for (let i = 0; i < command.$names.length; i++) {
        if (i === 0) this.$children.set(command.$names[i]!, { command });
        this.$children.set(command.$names[i]!, alias);
      }
    }
    return this;
  }

  /**
   * Creates a new subcommand and adds it.
   * @param names The aliases of the subcommand.
   * @param builder A builder to create the command.
   */
  subCommand(names: string | string[], builder: Builder): this;
  /**
   * Creates a new subcommand and adds it.
   * @param names The aliases of the subcommand.
   * @param desc The description of the subcommand.
   * @param version The version of the subcommand.
   */
  subCommand(
    names: string | string[],
    desc?: string,
    version?: string,
  ): Command<any>;

  subCommand(
    names: string | string[],
    descOrBuilder?: Builder | string,
    version?: string,
  ): Command<any> {
    if (typeof descOrBuilder === "function") {
      const command = new Command(names);
      descOrBuilder(command);
      this.add(command);
      return this;
    }

    const command = new Command(names, descOrBuilder, version);
    this.add(command);
    return command;
  }

  /**
   * Allows unknown options.
   * @returns this
   */
  allowUnknownOptions(): this {
    this.$allowUnknownOptions = true;
    return this;
  }

  /**
   * Parses a set of command-line arguments.
   * @param argv The arguments to parse.
   * @returns A validated parse result.
   */
  async parse(argv = process.argv.slice(2)): Promise<ValidatedParseResult<T>> {
    this.$parser ??= unix();

    // eslint-disable-next-line -- alias of this is necessary to traverse through the tree
    let command: Command<any> = this;
    const middlewares: MiddlewareFn[] = [...command.$middlewares];
    let args = argv;
    while (args.length > 0 && command.$children.has(args[0]!)) {
      if (!this.$parser.capabilities.subCommands)
        throw new Error(
          "Subcommands aren't allowed in the parser you're using.",
        );
      command = command.$children.get(args[0]!)!.command;
      middlewares.push(...command.$middlewares);
      args = args.slice(1);
    }

    if (command.$theme) setTheme(command.$theme);
    const map = command.buildInputMap();
    const { flags, positional } = await this.$parser.parse(args, map);

    const input: Record<string, unknown> = {};
    const errors: ConvokerError[] = [];
    let isHelp = false;
    let isVersion = false;

    // Set option input values
    for (const [flag, flagValue] of flags) {
      if (flag === "h" || flag === "help") {
        isHelp = true;
      } else if (flag === "V" || flag === "version") {
        isVersion = true;
      }

      if (!map.has(flag)) {
        if (!command.$allowUnknownOptions)
          errors.push(new UnknownOptionError(command, flag));
        continue;
      }
      const { inputKey, inputOption } = map.get(flag)!;
      input[inputKey] =
        inputOption.$kind === "boolean"
          ? true
          : await convert(inputOption.$kind, flagValue as string);
    }

    // Set positional input values
    for (let i = 0; i < positional.length; i++) {
      if (!map.has(i)) {
        if (!command.$allowSurpassArgLimit)
          errors.push(new TooManyArgumentsError(command));
        break;
      }

      const { inputKey, inputOption } = map.get(i)!;
      if (inputOption.$list) {
        const values: string[] = [];
        while (i++ < positional.length) {
          values.push(positional[i]!);
        }
        input[inputKey] = await convert(inputOption.$kind, values);
      } else {
        input[inputKey] =
          inputOption.$kind === "boolean"
            ? true
            : await convert(inputOption.$kind, positional[i]!);
      }
    }

    // Apply defaults and enforce required
    for (const inputKey in command.$input) {
      const inputValue = command.$input[inputKey];
      if (!input[inputKey]) {
        if (inputValue.$default) input[inputKey] = inputValue.$default;
        else if (inputValue.$required) {
          const ErrorClass =
            inputValue instanceof Positional
              ? MissingRequiredArgumentError
              : MissingRequiredOptionError;
          errors.push(new ErrorClass(command, inputKey, inputValue));
        }
      }
    }

    return {
      command,
      middlewares,
      errors,
      input: input as InferInput<T>,
      isHelp,
      isVersion,
    };
  }

  private buildInputMap(
    ignoreParentMap?: boolean,
  ): Map<string | number, InputMapEntry> {
    const map = new Map<string | number, InputMapEntry>();

    let i = 0;
    for (const key in this.$input) {
      const value = this.$input[key]!;
      if (value instanceof Positional) {
        map.set(i++, { inputOption: value, inputKey: key });
      } else {
        for (const name of value.$names) {
          map.set(name, { inputOption: value, inputKey: key });
        }
      }
    }

    if (!ignoreParentMap) {
      for (const [key, entry] of this.$parent?.buildInputMap() ?? []) {
        map.set(key, entry);
      }
    }

    for (const [, { command }] of this.$children) {
      for (const [key, entry] of command.buildInputMap(true)) {
        map.set(key, entry);
      }
    }

    return map;
  }

  /**
   * Allows surpassing the amount of arguments specified.
   * @returns this
   */
  allowSurpassArgLimit(): this {
    this.$allowSurpassArgLimit = true;
    return this;
  }

  /**
   * Gets the full command path (name including parents).
   * @returns The full command path.
   */
  fullCommandPath(): string {
    const names: string[] = [];
    // eslint-disable-next-line -- necessary for traversing up the tree
    let cmd: Command<any> | undefined = this;
    while (cmd) {
      names.unshift(cmd.$names[0]!);
      cmd = cmd.$parent;
    }
    return names.join(" ");
  }

  /**
   * The default error screen.
   * @param errors The errors.
   */
  defaultErrorScreen(errors: Error[]) {
    let printHelpScreen = false;
    const nonCliErrors: Error[] = [];

    for (const error of errors) {
      if (error instanceof ConvokerError) {
        if (!(error instanceof HelpAskedError)) error.print();
        printHelpScreen = true;
      } else {
        nonCliErrors.push(error);
      }
    }

    if (nonCliErrors.length) throw nonCliErrors[0];

    if (!printHelpScreen) return;
    const pad = (s: string, len: number) => s.padEnd(len, " ");

    console.log(
      `${bold("usage:")} ${cyan(this.fullCommandPath())} ${gray("[options] [arguments]")}`,
    );
    if (this.$description) {
      console.log(`${this.$description}`);
    }

    if (this.$version) {
      console.log(`${bold("version")} ${this.$version}`);
    }

    // OPTIONS
    const opts = Object.entries(this.$input)
      .filter(([, entry]) => entry instanceof Option)
      .map(([key, entry]) => ({ key, entry: entry as Option<any, any, any> }));

    if (opts.length > 0) {
      console.log(bold("options:"));
      const longest = Math.max(
        ...opts.map(({ entry }) => entry.$names.join(", ").length),
      );
      for (const { entry } of opts) {
        const names = entry.$names
          .map((n) => (n.length === 1 ? `-${n}` : `--${n}`))
          .join(", ");
        const line = `  ${cyan(pad(names, longest + 4))}${gray(entry.$description ?? "")}`;
        console.log(line);
      }
    }

    // POSITIONALS
    const positionals = Object.entries(this.$input)
      .filter(([, entry]) => entry instanceof Positional)
      .map(([key, entry]) => ({
        key,
        entry: entry as Positional<any, any, any>,
      }));

    if (positionals.length > 0) {
      console.log(bold("arguments:"));
      const longest = Math.max(...positionals.map(({ key }) => key.length));
      for (const { key, entry } of positionals) {
        const name = entry.$required ? `<${key}>` : `[${key}]`;
        const line = `  ${cyan(pad(name, longest + 4))}${gray(entry.$description ?? "")}`;
        console.log(line);
      }
    }

    // SUBCOMMANDS
    if (this.$children.size > 0) {
      console.log(bold("sub commands:"));
      const deduped = Array.from(
        new Map(
          [...this.$children.values()].map((a) => [
            a.command.$names[0],
            a.command,
          ]),
        ).values(),
      );

      const longest = Math.max(...deduped.map((c) => c.$names[0]!.length));
      for (const cmd of deduped) {
        const line = `  ${cyan(pad(cmd.$names[0]!, longest + 4))}${gray(cmd.$description) ?? ""}`;
        console.log(line);
      }
      console.log();
      console.log(
        `run '${cyan(`${this.fullCommandPath()} <command> --help`)}' for more info on a command.`,
      );
    }
  }

  /**
   * Handles a set of errors.
   * @param errors The errors to handle.
   * @param input The parsed input, if possible.
   * @returns this
   */
  async handleErrors(
    errors: Error[],
    input?: Partial<InferInput<T>>,
  ): Promise<this> {
    // eslint-disable-next-line -- necessary for traversing up the tree
    let command: Command<any> = this;
    while (!command.$errorFn && command.$parent) {
      command = command.$parent;
    }

    if (command.$errorFn) {
      await command.$errorFn(command, errors, input ?? {});
    } else {
      this.defaultErrorScreen(errors);
    }
    return this;
  }

  /**
   * Runs a command.
   * @param argv The arguments to run the command with. Defaults to your runtime's `argv` equivalent.
   * @returns this
   */
  async run(argv = process.argv.slice(2)): Promise<this> {
    const result = await this.parse(argv);
    if (result.isHelp) {
      result.command.handleErrors([new HelpAskedError(result.command)]);
      return this;
    } else if (result.isVersion) {
      console.log(
        `${result.command.fullCommandPath()} version ${result.command.$version}`,
      );
      return this;
    }

    try {
      if (result.errors.length > 0) {
        await result.command.handleErrors(result.errors, result.input);
      } else if (!result.command.$fn) {
        await result.command.handleErrors(
          [new HelpAskedError(result.command), ...result.errors],
          result.input,
        );
      } else {
        if (result.middlewares.length > 0) {
          const runner = compose(result.middlewares);
          // finalNext calls the command action with the same input
          await runner(result.input, async () => {
            await result.command.$fn?.(result.input);
          });
        } else {
          await result.command.$fn(result.input);
        }
      }
    } catch (e) {
      if (!(e instanceof Error)) {
        console.warn(
          "[convoker] an error that is not instance of `Error` was thrown. this may cause undefined behavior.",
        );
      }
      await result.command.handleErrors([e as Error]);
    }
    return this;
  }
}

function compose(mws: MiddlewareFn<any>[]) {
  return (input: InferInput<any>, finalNext?: () => Promise<any>) => {
    let index = -1;
    const dispatch = (i: number): Promise<any> => {
      if (i <= index)
        return Promise.reject(new Error("next() called multiple times"));
      index = i;
      const fn = mws[i];
      if (!fn) {
        // when middlewares exhausted call finalNext if provided
        return finalNext ? finalNext() : Promise.resolve();
      }
      try {
        return Promise.resolve(fn(input, () => dispatch(i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    };
    return dispatch(0);
  };
}
