import readline from "node:readline";
import type { CoreOpts } from ".";
import { createPrompt, type PromptContext } from "./static";

export interface Keypress {
  name: string;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
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

export function createInteractivePrompt<T, O extends CoreOpts<T>, S>(
  setup: (ctx: InteractiveContext<T, O, S>) => void,
  initialState: (opts: O) => S,
) {
  return createPrompt<T, O>((baseCtx) => {
    const { input, output } = baseCtx;

    readline.emitKeypressEvents(input);

    if (
      "isTTY" in input &&
      input.isTTY &&
      "setRawMode" in input &&
      typeof input.setRawMode === "function"
    ) {
      input.setRawMode(true);
    }

    let state = initialState(baseCtx.opts);
    let keyHandler: ((key: Keypress) => void) | null = null;

    const render = () => {
      output.write("\x1Bc");
      setup(ctx);
    };

    const setState = (updater: (prev: S) => S) => {
      state = updater(state);
      ctx.state = state;
      render();
    };

    const onKeypress = (handler: (key: Keypress) => void) => {
      keyHandler = handler;
    };

    const ctx: InteractiveContext<T, O, S> = {
      ...baseCtx,
      state,
      setState,
      render,
      onKeypress,
    };

    const cleanupInteractive = () => {
      input.removeAllListeners("keypress");

      if (
        "isTTY" in input &&
        input.isTTY &&
        "setRawMode" in input &&
        typeof input.setRawMode === "function"
      ) {
        input.setRawMode(false);
      }
    };

    // Patch base done/abort to include interactive cleanup
    const originalDone = baseCtx.done;
    const originalAbort = baseCtx.abort;

    baseCtx.done = (value: T) => {
      cleanupInteractive();
      originalDone(value);
    };

    baseCtx.abort = () => {
      cleanupInteractive();
      originalAbort();
    };

    input.on("keypress", (_, key) => {
      keyHandler?.(key);
    });

    render();
  });
}
