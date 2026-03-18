import { createPrompt, type CoreOpts } from "@/core";
import { renderTextlikePrompt, handleTextlikeInput } from "./_shared/textlike";

/**
 * Options for text input.
 */
export interface TextOpts extends CoreOpts<string> {
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
}

/**
 * Prompts the user for text input.
 */
export default createPrompt<string, TextOpts>((ctx) => {
  const { opts } = ctx;

  renderTextlikePrompt(ctx, {
    message: opts.message,
    placeholder: opts.placeholder,
    default: opts.default,
    minLength: opts.minLength,
    maxLength: opts.maxLength,
  });

  handleTextlikeInput(ctx, {
    message: opts.message,
    placeholder: opts.placeholder,
    default: opts.default,
    minLength: opts.minLength,
    maxLength: opts.maxLength,
  });
});
