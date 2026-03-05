import { describe, it, expect, vi, beforeEach } from "vitest";
import { createInteractivePrompt } from "@/core";
import readline from "node:readline";

vi.spyOn(readline, "emitKeypressEvents").mockImplementation(() => {});

type Function = (...args: unknown[]) => unknown;

function createMockStream() {
  const listeners: Record<string, Function[]> = {};

  return {
    isTTY: true,
    setRawMode: vi.fn(),
    write: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    on: vi.fn((event: string, cb: Function) => {
      listeners[event] ??= [];
      listeners[event].push(cb);
    }),
    removeListener: vi.fn(
      (event?: string, cb?: (...args: unknown[]) => unknown) => {
        if (event)
          listeners[event] = listeners[event]!.splice(
            listeners[event]!.findIndex((a) => a === cb),
            1,
          );
      },
    ),
    emit(event: string, ...args: any[]) {
      listeners[event]?.forEach((fn) => fn(...args));
    },
  };
}

describe("createInteractivePrompt", () => {
  let input: any;
  let output: any;

  beforeEach(() => {
    input = createMockStream();
    output = createMockStream();
  });

  it("initializes state and renders", async () => {
    const render = vi.fn((ctx) => {
      ctx.done("done");
    });

    const prompt = createInteractivePrompt({
      render,
      initialState: () => ({ count: 0 }),
    });

    await expect(prompt({ message: "test", input, output })).resolves.toBe(
      "done",
    );

    expect(render).toHaveBeenCalled();
    expect(output.write).toHaveBeenCalledWith("\n");
  });

  it("updates state with setState and re-renders", async () => {
    let renderCount = 0;

    const prompt = createInteractivePrompt({
      render: (ctx) => {
        renderCount++;
        if (ctx.state.count === 1) {
          ctx.done("ok");
        } else {
          ctx.setState((prev) => ({ count: prev.count + 1 }));
        }
      },
      initialState: () => ({ count: 0 }),
    });

    await expect(prompt({ message: "test", input, output })).resolves.toBe(
      "ok",
    );
    expect(renderCount).toBeGreaterThan(1);
  });

  it("handles keypress events", async () => {
    const prompt = createInteractivePrompt({
      render: (ctx) => {
        ctx.onKeypress((key) => {
          if (key.name === "enter") {
            ctx.done("submitted");
          }
        });
      },
      initialState: () => ({}),
    });

    const promise = prompt({ message: "test", input, output });

    input.emit("keypress", null, {
      name: "enter",
      ctrl: false,
      meta: false,
      shift: false,
    });

    await expect(promise).resolves.toBe("submitted");
  });

  it("restores raw mode on done", async () => {
    const prompt = createInteractivePrompt({
      render: (ctx) => ctx.done("x"),
      initialState: () => ({}),
    });

    await prompt({ message: "test", input, output });

    expect(input.setRawMode).toHaveBeenNthCalledWith(1, true);
    expect(input.setRawMode).toHaveBeenNthCalledWith(2, false);
    expect(input.setRawMode).toHaveBeenCalledTimes(2);
  });
});
