import type { CoreOpts } from "@/core";

/**
 * Options for opening the system editor.
 */
export interface EditorOpts extends CoreOpts<string> {
  /**
   * The initial value.
   */
  initial?: string;
  /**
   * The language of the value.
   */
  language?: string;
  /**
   * If the input is required for continuing or not.
   */
  required?: boolean;
}

export default async function editor(opts: EditorOpts): Promise<string> {
  // TODO
}
