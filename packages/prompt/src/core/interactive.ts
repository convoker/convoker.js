import readline from "node:readline";
import type { CoreOpts } from ".";
import type { PromptContext } from "./static";

export interface PromptState {
  cursor: number;
}

export interface InteractiveContext<
  T,
  O extends CoreOpts<T>,
  S,
> extends PromptContext<T> {
  opts: O;
  state: S;
  setState: (updater: (prev: S) => S) => void;
  render: () => void;
  onKeypress: (handler: (key: Keypress) => void) => void;
}

export interface Keypress {
  name: string;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
}

export function createInteractivePrompt<T, O extends CoreOpts<T>, S>(
  setup: (ctx: InteractiveContext<T, O, S>) => void,
  initialState: (opts: O) => S,
) {
  return async function prompt(opts: O): Promise<T> {
    return new Promise((resolve, reject) => {
      const input = opts.input ?? process.stdin;
      const output = opts.output ?? process.stdout;

      readline.emitKeypressEvents(input);
      if ("isTTY" in input && input.isTTY && "setRawMode" in input)
        input.setRawMode(true);

      let state = initialState(opts);
      let keyHandler: ((key: Keypress) => void) | null = null;

      const cleanup = () => {
        if ("isTTY" in input && input.isTTY && "setRawMode" in input)
          input.setRawMode(false);
        input.removeAllListeners("keypress");
      };

      const render = () => {
        output.write("\x1Bc"); // clear
        draw();
      };

      const setState = (updater: (prev: S) => S) => {
        state = updater(state);
        render();
      };

      const done = (value: T) => {
        cleanup();
        resolve(value);
      };

      const ctx: InteractiveContext<T, O, S> = {
        opts,
        input,
        output,
        theme: opts.theme!,
        state,
        setState,
        render,
        done,
        abort: () => reject(new Error("aborted")),
        error: reject,
        validate: async (v) => v,
        value: undefined,
        onKeypress: (handler) => {
          keyHandler = handler;
        },
      };

      const draw = () => {
        setup(ctx);
      };

      input.on("keypress", (_, key) => {
        keyHandler?.(key);
      });

      render();
    });
  };
}
