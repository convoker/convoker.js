import Stream from "node:stream";
import process from "node:process";
import type { Theme } from "@convoker/theme";
import { getTheme, setTheme } from "@convoker/theme/global";
import { merge, type DeepPartial } from "@convoker/theme/utils";
import { WriteError } from "./error";

/**
 * Log configuration.
 */
export interface Config {
  /**
   * The configuration format.
   */
  format: "text" | "json";
  /**
   * Standard output.
   */
  stdout: Stream.Writable;
  /**
   * Standard error output.
   */
  stderr: Stream.Writable;
  /**
   * How much space in the JSON output of objects.
   * This does not change spacing in JSON logs, only for objects passed into log functions.
   */
  jsonSpace: number;
}

/**
 * Default log configuration.
 */
export const DEFAULT_CONFIG: Config = {
  format: "text",
  stderr: process.stderr,
  stdout: process.stdout,
  jsonSpace: 2,
};

let config: Config = DEFAULT_CONFIG;

/**
 * Sets log configuration.
 * @param cfg The configuration, optionally including a theme.
 */
export function setConfig({
  theme,
  ...cfg
}: DeepPartial<Config> & { theme?: Theme }) {
  config = merge(DEFAULT_CONFIG, cfg);
  if (theme) setTheme(theme);
}

/**
 * Prints messages.
 * @param msgs The messages to print.
 */
export function trace(...msgs: any[]) {
  const str = format(msgs, "TRACE");
  if (!config.stdout.write(str)) {
    throw new WriteError("stdout");
  }
}

/**
 * Prints messages.
 * @param msgs The messages to print.
 */
export function info(...msgs: any[]) {
  const str = format(msgs, "INFO");
  if (!config.stdout.write(str)) {
    throw new WriteError("stdout");
  }
}

/**
 * Prints warning messages.
 * @param msgs The messages to print.
 */
export function warn(...msgs: any[]) {
  const str = format(msgs, "WARN");
  if (!config.stderr.write(str)) {
    throw new WriteError("stderr");
  }
}

/**
 * Prints error messages.
 * @param msgs The messages to print.
 */
export function error(...msgs: any[]) {
  const str = format(msgs, "ERROR");
  if (!config.stderr.write(str)) {
    throw new WriteError("stderr");
  }
}

/**
 * Prints messages and exits with code -1.
 * @param msgs The messages to print.
 */
export function fatal(...msgs: any[]) {
  const str = format(msgs, "FATAL");
  if (!config.stderr.write(str)) {
    throw new WriteError("stderr");
  }

  process.exit(-1);
}

export * from "./error";

/**
 * Formats a list of messages into a single string.
 * @param msgs The messages to format.
 * @param level The log level.
 * @returns A formatted message.
 */
function format(msgs: any[], level: string): string {
  const timestamp = new Date().toISOString();
  const msg = msgs
    .map((m) =>
      typeof m === "string" ? m : JSON.stringify(m, null, config.jsonSpace),
    )
    .join(" ");
  const th = getTheme();

  switch (config.format) {
    case "json":
      return colorize(
        JSON.stringify({ timestamp, level, message: msg }) + "\n",
        level,
      );
    case "text":
    default: {
      const symbol = (th.symbols as any)[level];
      return colorize(
        `[${timestamp}] [${symbol ? `${symbol} ${level}` : level}] ${msg}\n`,
        level,
      );
    }
  }
}

/**
 * Wraps a string in ANSI codes, based on a log level.
 * @param str The string to color.
 * @param level The log level.
 * @returns An ANSI-wrapped string.
 */
function colorize(str: string, level: string) {
  const th = getTheme();
  switch (level) {
    case "TRACE":
      return th.secondary(str);
    case "WARN":
      return th.warning(str);
    case "ERROR":
      return th.error(str);
    case "FATAL":
      return th.styles?.bold ? th.styles.bold(th.error(str)) : th.error(str);
    case "INFO":
    default:
      return th.info?.(str) ?? str;
  }
}
