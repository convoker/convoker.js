import { createInteractivePrompt, type InteractiveContext } from "@/core";
import type { SelectOption, SelectOpts } from "./select";
import {
  renderEmpty,
  renderOption,
  renderSelectHeader,
} from "./_shared/select";

/**
 * Options for search input.
 */
export interface SearchOpts<
  T,
  M extends boolean = false,
  Q = string,
> extends SelectOpts<T, M> {
  /**
   * Placeholder for the search input.
   */
  placeholder?: string;
  /**
   * Minimum length for a query string.
   */
  minQueryLength?: number;
  /**
   * Transforms a query before running filter functions.
   * @param query The query.
   */
  transformQuery?(query: string): Q;
  /**
   * Filters a single option.
   * @param query The search query.
   * @param option The option to filter.
   */
  filter?(query: Q, option: SelectOption<T>): boolean;
}

/**
 * Prompts the user to search through a list of options.
 * @param opts Options for search input.
 * @returns The selected option.
 */
export default function search<T, M extends boolean = false>(
  opts: SearchOpts<T, M>,
): Promise<M extends true ? T[] : T> {
  if (opts.multiple) return searchMultiple(opts);
  else return searchSingle(opts);
}

interface SearchBaseState {
  /**
   * Current search query typed by the user.
   */
  query: string;
  /**
   * Index of the currently highlighted item
   * within the filtered results array.
   */
  cursor: number;
  /**
   * Indices of options that match the current query.
   * These are indices into opts.options.
   */
  filtered: number[];
}

type SearchSingleState = SearchBaseState;

const searchSingle = createInteractivePrompt<
  any,
  SearchOpts<any, any, any>,
  SearchSingleState
>({
  initialState(opts) {
    return {
      query: "",
      cursor: 0,
      filtered: opts.options.map((_, i) => i),
    };
  },

  setup(ctx) {
    const { opts } = ctx;

    ctx.onKeypress(async (key) => {
      if (key.ctrl && key.name === "c") {
        return ctx.abort();
      }

      if (key.name === "return") {
        const { state } = ctx;

        let index = state.filtered[state.cursor];

        while (index !== undefined && opts.options[index]?.disabled) {
          state.cursor++;
          index = state.filtered[state.cursor];
        }

        if (index === undefined) return;

        const value = opts.options[index]!.value;
        const validated = await ctx.validate(value);
        ctx.done(validated);
        return;
      }

      if (handleSearchKeypress(ctx, key, opts)) return;
    });
  },

  render(ctx) {
    const { state, opts } = ctx;

    const query =
      state.query ||
      (opts.placeholder
        ? (ctx.theme.prompt?.placeholder?.(opts.placeholder) ??
          opts.placeholder)
        : opts.message);

    renderSelectHeader(ctx, query);

    if (state.filtered.length === 0) {
      renderEmpty(ctx);
      return;
    }

    state.filtered.forEach((optionIndex, i) => {
      const opt = opts.options[optionIndex]!;

      renderOption(ctx, {
        label: opt.label,
        hint: opt.hint,
        disabled: opt.disabled,
        isCursor: i === state.cursor,
      });
    });
  },
});

interface SearchMultipleState extends SearchBaseState {
  /**
   * Selected option indices (original option indices).
   */
  selected: Set<number>;
}

const searchMultiple = createInteractivePrompt<
  any,
  SearchOpts<any, any, any>,
  SearchMultipleState
>({
  initialState(opts) {
    const filtered = opts.options.map((_, i) => i);
    const index = opts.initialIndex;

    return {
      query: "",
      cursor: index ?? 0,
      filtered,
      selected: index !== undefined ? new Set([index]) : new Set(),
    };
  },

  setup(ctx) {
    const { opts } = ctx;

    ctx.onKeypress(async (key) => {
      if (key.ctrl && key.name === "c") {
        return ctx.abort();
      }

      if (key.name === "return") {
        const { state } = ctx;

        const values = [...state.selected].map((i) => opts.options[i]!.value);

        const validated = await ctx.validate(values);
        ctx.done(validated);
        return;
      }

      if (key.name === "space") {
        const optionIndex = ctx.state.filtered[ctx.state.cursor];
        if (optionIndex === undefined) return;

        ctx.setState((s) => {
          const selected = new Set(s.selected);

          if (selected.has(optionIndex)) selected.delete(optionIndex);
          else selected.add(optionIndex);

          return { ...s, selected };
        });

        return;
      }

      if (handleSearchKeypress(ctx as any, key, opts)) return;
    });
  },

  render(ctx) {
    const { state, opts } = ctx;

    const query =
      state.query ||
      (opts.placeholder
        ? (ctx.theme.prompt?.placeholder?.(opts.placeholder) ??
          opts.placeholder)
        : opts.message);

    renderSelectHeader(ctx, query);

    if (state.filtered.length === 0) {
      renderEmpty(ctx);
      return;
    }

    state.filtered.forEach((optionIndex, i) => {
      const opt = opts.options[optionIndex]!;

      renderOption(ctx, {
        label: opt.label,
        hint: opt.hint,
        disabled: opt.disabled,
        isCursor: i === state.cursor,
        isSelected: state.selected.has(optionIndex),
        multiple: true,
      });
    });

    const help =
      ctx.theme.prompt?.inactive?.("Press space to select, enter to confirm") ??
      ctx.theme.secondary("Press space to select, enter to confirm");

    ctx.output.write("\n" + help + "\n");
  },
});

function computeFiltered<T, Q>(
  query: string,
  opts: SearchOpts<T, any>,
): number[] {
  const q = opts.transformQuery?.(query) ?? (query as unknown as Q);

  if (opts.minQueryLength && query.length < opts.minQueryLength) {
    return opts.options.map((_, i) => i);
  }

  return opts.options
    .map((opt, i) => ({ opt, i }))
    .filter(
      ({ opt }) =>
        !opt.disabled &&
        (opts.filter
          ? opts.filter(q as any, opt)
          : String(opt.label).toLowerCase().includes(query.toLowerCase())),
    )
    .map(({ i }) => i);
}

function handleSearchKeypress<T>(
  ctx: InteractiveContext<any, any, SearchBaseState>,
  key: any,
  opts: SearchOpts<T, any, any>,
) {
  if (key.name === "up") {
    ctx.setState((s) => ({
      ...s,
      cursor: Math.max(0, s.cursor - 1),
    }));
    return true;
  }

  if (key.name === "down") {
    ctx.setState((s) => ({
      ...s,
      cursor: Math.min(s.filtered.length - 1, s.cursor + 1),
    }));
    return true;
  }

  if (key.name === "backspace") {
    ctx.setState((s) => {
      const query = s.query.slice(0, -1);
      const filtered = computeFiltered(query, opts);

      return {
        ...s,
        query,
        filtered,
        cursor: 0,
      };
    });
    return true;
  }

  if (key.name?.length === 1 && !key.ctrl && !key.meta) {
    ctx.setState((s) => {
      const query = s.query + key.name;
      const filtered = computeFiltered(query, opts);

      return {
        ...s,
        query,
        filtered,
        cursor: 0,
      };
    });
    return true;
  }

  return false;
}
