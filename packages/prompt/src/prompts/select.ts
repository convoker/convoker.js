import type { CoreOpts } from "@/core";

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
  // TODO
}
