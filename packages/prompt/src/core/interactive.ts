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

export function createInteractivePrompt<T, O extends CoreOpts<T>, S>(config: {
  setup?: (ctx: InteractiveContext<T, O, S>) => void;
  render: (ctx: InteractiveContext<T, O, S>) => void;
  initialState: (opts: O) => S;
}) {
  const { setup, render: renderView, initialState } = config;

  return createPrompt<T, O>((baseCtx) => {
    const { input, output } = baseCtx;

    readline.emitKeypressEvents(input);

    if (input.isTTY) {
      input.resume();
      input.setRawMode(true);
    }

    let state = initialState(baseCtx.opts);
    let keyHandler: ((key: Keypress) => void) | null = null;

    const cleanupInteractive = () => {
      input.removeListener("keypress", handleKeypress);

      if (input.isTTY) {
        input.setRawMode(false);
        input.pause();
      }

      output.write("\n");
    };

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

    const render = () => {
      // Restore to saved position
      output.write("\x1B[u");

      // Clear everything below
      output.write("\x1B[J");

      ctx.state = state;
      renderView(ctx);
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

    const handleKeypress = (_: unknown, key: Keypress) => {
      keyHandler?.(key);
    };

    input.on("keypress", handleKeypress);

    // Save cursor position
    output.write("\x1B[s");

    setup?.(ctx);
    render();
  });
}
