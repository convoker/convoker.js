import tty from "node:tty";
import type { StandardSchemaV1 } from "@convoker/input";
import type { Theme } from "@convoker/theme";

/**
 * Base options for prompts.
 */
export interface CoreOpts<T> {
  /**
   * The message of the prompt.
   */
  message: string;
  /**
   * A validator function, or a Standard Schema validator.
   */
  validate?: StandardSchemaV1<any, T> | ((value: T) => boolean | T);
  /**
   * The theme of the prompt.
   */
  theme?: Theme;
  /**
   * The default value.
   */
  default?: T;

  /**
   * The standard input. Defaults to `process.stdin`.
   */
  input?: tty.ReadStream;
  /**
   * The standard output. Defaults to `process.stdout`.
   */
  output?: tty.WriteStream;
  /**
   * If the screen should be cleared when finishing a prompt.
   */
  clearPromptOnDone?: boolean;
  /**
   * An `AbortSignal` to cancel the prompt.
   */
  signal?: AbortSignal;
}

export * from "./static";
export * from "./interactive";
export * from "./error";
