import { createInteractivePrompt, PromptValidationError } from "@/core";
import type { TextOpts } from "./text";

/**
 * Options for password input.
 */
export interface PasswordOpts extends TextOpts {
  /**
   * The mask for the password input.
   */
  mask?: string;
  /**
   * If the user should be asked to confirm the password, by typing it again.
   */
  confirm?: boolean;
}

interface PasswordState {
  value: string;
  confirming: boolean;
  first?: string;
}

/**
 * Prompts the user for a password.
 * @param opts Options for password input.
 * @returns The password.
 */
export default createInteractivePrompt<string, PasswordOpts, PasswordState>({
  setup(ctx) {
    const { onKeypress, setState, done, validate, opts } = ctx;

    onKeypress(async (key) => {
      const state = ctx.state;

      if (key.ctrl && key.name === "c") {
        ctx.abort();
        return;
      }

      if (key.name === "return" || key.name === "enter") {
        try {
          const current = state.value;

          if (!current && opts.default !== undefined) {
            return done(opts.default);
          }

          if (opts.minLength && current.length < opts.minLength) {
            throw new PromptValidationError(["Too short"]);
          }

          if (opts.maxLength && current.length > opts.maxLength) {
            throw new PromptValidationError(["Too long"]);
          }

          if (opts.confirm) {
            if (!state.confirming) {
              setState(() => ({
                value: "",
                confirming: true,
                first: current,
              }));
              return;
            }

            if (state.first !== current) {
              throw new PromptValidationError(["Passwords do not match"]);
            }
          }

          const validated = await validate(current);
          done(validated);
        } catch (err) {
          ctx.error(err);
        }

        return;
      }

      if (key.name === "backspace") {
        setState((prev) => ({
          ...prev,
          value: prev.value.slice(0, -1),
        }));
        return;
      }

      if (key.name && key.name.length === 1 && !key.ctrl && !key.meta) {
        setState((prev) => ({
          ...prev,
          value: prev.value + key.name,
        }));
      }
    });
  },

  render(ctx) {
    const { output, opts, state } = ctx;

    const mask = opts.mask ?? "*";

    const message = state.confirming
      ? `${opts.message} (confirm)`
      : opts.message;

    const visible = mask.repeat(state.value.length);

    output.write(`${message} ${visible}`);
  },

  initialState: () => ({
    value: "",
    confirming: false,
  }),
});
