import { getTheme } from "./theme";
import { PromptValidationError } from "./error";
import type { Theme } from "@convoker/theme";
import type { CoreOpts } from ".";

export interface PromptContext<T> {
  opts: CoreOpts<T>;
  value: T | undefined;
  done: (value: T) => void;
  error: (err: unknown) => void;
  abort: () => void;
  validate: (value: T) => Promise<T>;
  theme: Theme;
  input: NodeJS.ReadableStream;
  output: NodeJS.WritableStream;
}

export type PromptRenderer<T, O extends CoreOpts<T>> = (
  ctx: PromptContext<T> & { opts: O },
) => Promise<void>;

export function createPrompt<T, O extends CoreOpts<T>>(
  renderer: PromptRenderer<T, O>,
) {
  return async function prompt(opts: O): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      const input = opts.input ?? process.stdin;
      const output = opts.output ?? process.stdout;
      const theme = opts.theme ?? getTheme();

      let finished = false;

      const done = (value: T) => {
        if (finished) return;
        finished = true;

        if (opts.clearPromptOnDone) {
          output.write("\x1Bc");
        }

        resolve(value);
      };

      const abort = () => {
        if (finished) return;
        finished = true;
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

        // StandardSchemaV1
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
        await renderer(ctx as any);
      } catch (err) {
        reject(err);
      }
    });
  };
}
