import { PromptValidationError } from "@/core/error";
import type { PromptContext } from "@/core";
import type { TextOpts } from "./text";

/**
 * Apply defaulting + length validation + user validation.
 */
export async function resolveTextValue(
  ctx: Pick<PromptContext<string>, "validate">,
  opts: TextOpts,
  raw: string,
) {
  let value = raw.trim();

  if (!value && opts.default !== undefined) {
    value = opts.default;
  }

  if (opts.minLength && value.length < opts.minLength) {
    throw new PromptValidationError(["Too short"]);
  }

  if (opts.maxLength && value.length > opts.maxLength) {
    throw new PromptValidationError(["Too long"]);
  }

  return ctx.validate(value);
}

/**
 * Format message + placeholder using theme.
 */
export function formatPromptLine(
  message: string,
  value: string,
  placeholder: string | undefined,
  theme: any,
) {
  if (!value && placeholder) {
    return `${theme.primary(message)} ${theme.muted(placeholder)}`;
  }

  return `${theme.primary(message)} ${value}`;
}
