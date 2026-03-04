import { createPrompt, type CoreOpts } from "@/core";
import { PromptValidationError } from "@/core/error";

/**
 * Options for text input.
 */
export interface TextOpts extends CoreOpts<string> {
  /**
   * A placeholder, displayed when the user hasn't typed anything yet.
   */
  placeholder?: string;
  /**
   * Minimum length of the input.
   */
  minLength?: number;
  /**
   * Maximum length of the input.
   */
  maxLength?: number;
}

/**
 * Prompts the user for text input.
 * @param opts Options for text input.
 * @returns The text the user typed in, or the default.
 */
export default createPrompt<string, TextOpts>(async (ctx) => {
  const { output, input, opts, validate, done } = ctx;

  output.write(opts.message + " ");

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
      ctx.error(err);
    }
  });
});
