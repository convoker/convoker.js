import Stream from "node:stream";
import process from "node:process";
import { DEFAULT_THEME, type Theme } from "@/color";
import { DeepPartial, merge } from "@/utils";
import { WriteError } from "./error";

let th: Theme = DEFAULT_THEME;

export function setTheme(theme: Theme) {
  th = theme;
}

export interface Config {
  format: "text" | "json";
  stdout: Stream.Writable;
  stderr: Stream.Writable;
  jsonSpace: number;
}

export const DEFAULT_CONFIG: Config = {
  format: "text",
  stderr: process.stderr,
  stdout: process.stdout,
  jsonSpace: 2,
};

let config: Config = DEFAULT_CONFIG;

export function setConfig({
  theme,
  ...cfg
}: DeepPartial<Config> & { theme?: Theme }) {
  config = merge(DEFAULT_CONFIG, cfg);
  th = theme ?? th;
}

export function trace(...msgs: any[]) {
  const str = format(msgs, "TRACE");
  if (!config.stdout.write(th.secondary(str))) {
    throw new WriteError("stdout");
  }
}

export function info(...msgs: any[]) {
  const str = format(msgs, "INFO");
  if (!config.stdout.write(th.info?.(str) ?? str)) {
    throw new WriteError("stdout");
  }
}

export function warn(...msgs: any[]) {
  const str = format(msgs, "WARN");
  if (!config.stderr.write(th.warning(str))) {
    throw new WriteError("stderr");
  }
}

export function error(...msgs: any[]) {
  const str = format(msgs, "ERROR");
  if (!config.stderr.write(str)) {
    throw new WriteError("stderr");
  }
}

export function fatal(...msgs: any[]) {
  const str = format(msgs, "FATAL");
  if (!config.stderr.write(str)) {
    throw new WriteError("stderr");
  }

  process.exit(-1);
}

export * from "./error";

function format(msgs: any[], level: string): string {
  const timestamp = new Date().toISOString();
  const msg = msgs
    .map((m) =>
      typeof m === "string" ? m : JSON.stringify(m, null, config.jsonSpace),
    )
    .join(" ");
  switch (config.format) {
    case "json":
      return colorize(
        JSON.stringify({ timestamp, message: msg }) + "\n",
        level,
      );
    case "text":
    default:
      return colorize(
        `[${timestamp}] [${(th.symbols as any)[level] ?? level}]`,
        level,
      );
  }
}

function colorize(str: string, level: string) {
  switch (level) {
    case "trace":
      return th.secondary(str);
    case "warn":
      return th.warning(str);
    case "error":
      return th.error(str);
    case "fatal":
      return th.styles?.bold ? th.styles.bold(th.error(str)) : th.error(str);
    case "info":
    default:
      return th.info?.(str) ?? str;
  }
}
