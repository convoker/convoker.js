import process from "node:process";
import tty from "node:tty";
import { PromptValidationError } from "./error";
import type { Theme } from "@convoker/theme";
import { getTheme } from "@convoker/theme/global";
import type { CoreOpts } from ".";

export interface PromptContext<T> {
  opts: CoreOpts<T>;
  value: T | undefined;
  done: (value: T) => void;
  error: (err: unknown) => void;
  abort: () => void;
  validate: (value: T) => Promise<T>;
  theme: Theme;
  input: tty.ReadStream;
  output: tty.WriteStream;
}

export type PromptRenderer<T, O extends CoreOpts<T>> = (
  ctx: PromptContext<T> & { opts: O },
) => Promise<void> | void;

export function createPrompt<T, O extends CoreOpts<T>>(
  renderer: PromptRenderer<T, O>,
) {
  return async function prompt(opts: O): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const input = opts.input ?? process.stdin;
      const output = opts.output ?? process.stdout;
      const theme = opts.theme ?? getTheme();

      let finished = false;

      const cleanup = () => {
        input.pause();

        if (opts.signal) {
          opts.signal.removeEventListener("abort", abort);
        }
      };

      const done = (value: T) => {
        if (finished) return;
        finished = true;

        cleanup();

        if (opts.clearPromptOnDone) {
          output.write("\x1Bc");
        }

        resolve(value);
      };

      const abort = () => {
        if (finished) return;
        finished = true;
        cleanup();
        reject(new Error("Prompt aborted"));
      };

      const validate = async (value: T): Promise<T> => {
        if (!opts.validate) return value;

        if (typeof opts.validate === "function") {
          const result = opts.validate(value);
          if (result === true) return value;
          if (result === false) throw new PromptValidationError();
          return result;
        }

        const parsed = await opts.validate["~standard"].validate(value);
        if (parsed.issues) {
          throw new PromptValidationError(
            parsed.issues.map((issue) => issue.message),
          );
        }

        return parsed.value;
      };

      const ctx: PromptContext<T> = {
        opts,
        value: opts.default,
        done,
        abort,
        error: reject,
        validate,
        theme,
        input,
        output,
      };

      if (opts.signal) {
        opts.signal.addEventListener("abort", abort);
      }

      try {
        Promise.resolve(renderer(ctx as any)).catch(reject);
      } catch (err) {
        reject(err);
      }
    });
  };
}
