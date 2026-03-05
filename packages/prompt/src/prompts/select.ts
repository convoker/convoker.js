import { createInteractivePrompt, type CoreOpts } from "@/core";

/**
 * An option for select input.
 */
export interface SelectOption<T> {
  /**
   * The label (what gets displayed) of the select option.
   */
  label: string;
  /**
   * The value (what gets returned) of the select option.
   */
  value: T;
  /**
   * A description of the option.
   */
  hint?: string;
  /**
   * If this option is disabled.
   */
  disabled?: boolean;
}

/**
 * Options for select input.
 */
export interface SelectOpts<T, M extends boolean = false> extends CoreOpts<T> {
  /**
   * Every option the user can pick from.
   */
  options: SelectOption<T>[];
  /**
   * If the user can select multiple options.
   */
  multiple?: M;
  /**
   * The initial option selected.
   */
  initialIndex?: number;
}

export default async function select<T, M extends boolean = false>(
  opts: SelectOpts<T, M>,
): Promise<M extends true ? T[] : T> {
  if (opts.multiple) return multiSelect(opts);
  else return singleSelect(opts);
}

interface SingleSelectState {
  cursor: number;
}

const singleSelect = createInteractivePrompt<
  any,
  SelectOpts<any, any>,
  SingleSelectState
>({
  initialState: (opts) => ({
    cursor: opts.initialIndex ?? 0,
  }),

  setup(ctx) {
    const { onKeypress, abort, done, opts } = ctx;

    const move = (dir: 1 | -1) => {
      ctx.setState((prev) => {
        const { options } = opts;
        let next = prev.cursor;

        do {
          next = (next + dir + options.length) % options.length;
        } while (options[next]?.disabled);

        return { cursor: next };
      });
    };

    onKeypress(async (key) => {
      const { options } = opts;
      const { cursor } = ctx.state;

      if (key.ctrl && key.name === "c") return abort();

      if (key.name === "up") move(-1);
      else if (key.name === "down") move(1);
      else if (key.name === "return") {
        const option = options[cursor];
        if (!option || option.disabled) return;

        try {
          const validated = await ctx.validate(option.value);
          done(validated);
        } catch (err) {
          void err;
        }
      }
    });
  },

  render(ctx) {
    const { output, opts, state } = ctx;

    output.write(`${opts.message ?? "Select an option"}\n`);

    opts.options.forEach((opt, i) => {
      const cursor = i === state.cursor ? ">" : " ";
      const disabled = opt.disabled ? " (disabled)" : "";

      output.write(`${cursor} ${opt.label}${disabled}\n`);
    });
  },
});

interface MultiSelectState {
  cursor: number;
  selected: Set<number>;
}

const multiSelect = createInteractivePrompt<
  any,
  SelectOpts<any, any>,
  MultiSelectState
>({
  async setup(ctx) {
    const { setState, opts, onKeypress, abort, done } = ctx;
    const { options } = opts;
    const move = (dir: 1 | -1) => {
      setState((prev) => {
        let next = prev.cursor;

        do {
          next = (next + dir + options.length) % options.length;
        } while (options[next]?.disabled);

        return { ...prev, cursor: next };
      });
    };

    const toggle = () => {
      const { cursor } = ctx.state;
      if (options[cursor]?.disabled) return;

      setState((prev) => {
        const selected = new Set(prev.selected);
        if (selected.has(cursor)) selected.delete(cursor);
        else selected.add(cursor);
        return { ...prev, selected };
      });
    };

    onKeypress(async (key) => {
      if (key.ctrl && key.name === "c") return abort();

      if (key.name === "up") move(-1);
      else if (key.name === "down") move(1);
      else if (key.name === "space") toggle();
      else if (key.name === "return") {
        const values = [...ctx.state.selected].map((i) => options[i]!.value);

        const validated = await ctx.validate(values);
        done(validated);
      }
    });
  },

  render(ctx) {
    const { output, opts, state } = ctx;
    const { options } = opts;

    // Render
    output.write(`${opts.message ?? "Select options"}\n`);

    options.forEach((opt, i) => {
      const isCursor = i === state.cursor;
      const isSelected = state.selected.has(i);

      const cursor = isCursor ? ">" : " ";
      const checkbox = isSelected ? "[x]" : "[ ]";
      const disabled = opt.disabled ? " (disabled)" : "";

      output.write(`${cursor} ${checkbox} ${opt.label}${disabled}\n`);
    });
  },

  initialState(opts) {
    const selected = new Set<number>();

    if (typeof opts.initialIndex === "number") {
      selected.add(opts.initialIndex);
    }

    let cursor = 0;

    if (typeof opts.initialIndex === "number") {
      cursor = opts.initialIndex;
    }

    return { cursor, selected };
  },
});
