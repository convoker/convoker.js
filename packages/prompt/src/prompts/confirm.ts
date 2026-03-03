import type { CoreOpts } from "@/core";

/**
 * Options for confirm input.
 */
export interface ConfirmOpts extends CoreOpts<boolean> {
  /**
   * What gets displayed for the Yes option.
   */
  yesLabel?: string;
  /**
   * What gets displayed for the No option.
   */
  noLabel?: string;
}

/**
 * Prompts the user to confirm an action.
 * @param opts Options for confirm input.
 * @returns If the user the "Yes" option.
 */
export default async function confirm(opts: ConfirmOpts): Promise<boolean> {}
