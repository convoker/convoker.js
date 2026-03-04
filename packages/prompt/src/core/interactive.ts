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
      input.read?.();
      input.setRawMode(true);
    }

    let state = initialState(baseCtx.opts);
    let keyHandler: ((key: Keypress) => void) | null = null;
    let renderedLines = 0;

    const cleanupInteractive = () => {
      input.removeAllListeners("keypress");
      output.write("\n");

      if (input.isTTY) {
        input.setRawMode(false);
      }
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

    const clearBlock = () => {
      if (!renderedLines) return;

      // Move to top of previous render
      output.write(`\x1B[${renderedLines}F`);
      // F = move cursor up N lines AND to column 0

      for (let i = 0; i < renderedLines; i++) {
        output.write("\x1B[2K"); // clear entire line
        if (i < renderedLines - 1) {
          output.write("\x1B[1E");
          // E = move to next line, column 0
        }
      }

      // Move back to top again
      output.write(`\x1B[${renderedLines - 1}F`);
    };

    const render = () => {
      clearBlock();

      ctx.state = state;

      let buffer = "";
      const originalWrite = output.write.bind(output);

      output.write = ((chunk: any) => {
        buffer += chunk;
        return true;
      }) as any;

      renderView(ctx);

      output.write = originalWrite;

      const lines = buffer.endsWith("\n")
        ? buffer.slice(0, -1).split("\n")
        : buffer.split("\n");

      renderedLines = lines.length;

      originalWrite(buffer);
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

    input.on("keypress", (_, key) => {
      keyHandler?.(key);
    });

    setup?.(ctx);
    render();
  });
}
