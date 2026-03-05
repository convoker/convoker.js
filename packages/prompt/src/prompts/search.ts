import { createInteractivePrompt } from "@/core";
import type { SelectOption, SelectOpts } from "./select";

/**
 * Options for search input.
 */
export interface SearchOpts<T, M extends boolean = false> extends SelectOpts<
  T,
  M
> {
  /**
   * Placeholder for the search input.
   */
  placeholder?: string;
  /**
   * Minimum length for a query string.
   */
  minQueryLength?: number;
  /**
   * Filters a single option.
   * @param query The search query.
   * @param option The option to filter.
   */
  filter?(query: string, option: SelectOption<T>): boolean;
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

interface SearchSingleState {
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

const searchSingle = createInteractivePrompt<
  any,
  SearchOpts<any, any>,
  SearchSingleState
>({
  // TODO
});

interface SearchMultipleState {
  /**
   * Current search query.
   */
  query: string;
  /**
   * Cursor position within filtered results.
   */
  cursor: number;
  /**
   * Filtered option indices (same concept as single).
   */
  filtered: number[];
  /**
   * Selected option indices (original option indices).
   */
  selected: Set<number>;
}

const searchMultiple = createInteractivePrompt<
  any,
  SearchOpts<any, any>,
  SearchMultipleState
>({
  // TODO
});
