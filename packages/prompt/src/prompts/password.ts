import { createInteractivePrompt, PromptValidationError } from "@/core";
import type { TextOpts } from "./text";
import { renderTextlikeLine } from "./_shared/textlike";

/**
 * Options for password input.
 */
export interface PasswordOpts extends TextOpts {
  mask?: string;
  confirm?: boolean;
}

interface PasswordState {
  value: string;
  confirming: boolean;
  first?: string;
}

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

    const maskChar = opts.mask ?? "*";
    const masked = maskChar.repeat(state.value.length);

    // Clear line before rendering (important for interactive UX)
    output.write("\r");

    renderTextlikeLine(ctx, {
      message: opts.message,
      placeholder: opts.placeholder,
      default: opts.default,
      value: state.value,
      masked,
      confirming: state.confirming,
    });
  },

  initialState: () => ({
    value: "",
    confirming: false,
  }),
});
