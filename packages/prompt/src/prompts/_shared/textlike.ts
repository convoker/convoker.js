import type { PromptContext } from "@/core";
import { PromptValidationError } from "@/core/error";

export interface TextlikeOptions {
  message: string;
  placeholder?: string;
  default?: string;
  minLength?: number;
  maxLength?: number;
}

export function renderTextlikePrompt(
  ctx: PromptContext<string>,
  opts: TextlikeOptions,
) {
  const { theme, output } = ctx;

  const prefix = theme.prompt?.prefix?.("?") ?? theme.primary("?");

  const message = theme.prompt?.message?.(opts.message) ?? opts.message;

  let line = `${prefix} ${message}`;

  if (opts.placeholder) {
    const ph =
      theme.prompt?.placeholder?.(`(${opts.placeholder})`) ??
      theme.secondary(`(${opts.placeholder})`);
    line += ` ${ph}`;
  } else if (opts.default !== undefined) {
    const def =
      theme.prompt?.default?.(`(${opts.default})`) ??
      theme.secondary(`(${opts.default})`);
    line += ` ${def}`;
  }
  line += " ";

  output.write(line);
}

export function handleTextlikeInput(
  ctx: PromptContext<string>,
  opts: TextlikeOptions,
) {
  const { input, validate, done, error } = ctx;

  input.setEncoding("utf8");
  input.resume();

  input.once("data", async (chunk) => {
    try {
      let value = chunk.toString("utf-8").trim();

      if (!value && opts.default !== undefined) {
        value = opts.default;
      }

      if (opts.minLength && value.length < opts.minLength) {
        throw new PromptValidationError(["Too short"]);
      }

      if (opts.maxLength && value.length > opts.maxLength) {
        throw new PromptValidationError(["Too long"]);
      }

      const validated = await validate(value);
      done(validated);
    } catch (err) {
      error(err);
    }
  });
}

export interface TextlikeRenderOptions {
  message: string;
  placeholder?: string;
  default?: string;
  value?: string;
  masked?: string;
  confirming?: boolean;
}

export function renderTextlikeLine(
  ctx: PromptContext<string>,
  opts: TextlikeRenderOptions,
) {
  const { theme, output } = ctx;

  const prefix = theme.prompt?.prefix?.("?") ?? theme.primary("?");

  const msgText = opts.confirming ? `${opts.message} (confirm)` : opts.message;

  const message = theme.prompt?.message?.(msgText) ?? msgText;

  let line = `${prefix} ${message} `;

  // If user typed something → show input
  if (opts.value && opts.value.length > 0) {
    const input =
      theme.prompt?.input?.(opts.masked ?? opts.value) ??
      opts.masked ??
      opts.value;

    line += input;
  } else if (opts.placeholder) {
    const ph =
      theme.prompt?.placeholder?.(`(${opts.placeholder})`) ??
      theme.secondary(`(${opts.placeholder})`);

    line += ph;
  } else if (opts.default !== undefined) {
    const def =
      theme.prompt?.default?.(`(${opts.default})`) ??
      theme.secondary(`(${opts.default})`);

    line += def;
  }

  output.write(line);
}
