import { merge, type DeepPartial } from "./utils";
import * as color from "./color";

/**
 * A theme.
 */
export interface Theme {
  /**
   * Wraps a string in a background ANSI code.
   * @param a The string to wrap.
   */
  background?(a: string): string;
  /**
   * Wraps a string in a foreground ANSI code.
   * @param a The string to wrap.
   */
  foreground?(a: string): string;
  /**
   * Wraps a string in a primary ANSI code.
   * @param a The string to wrap.
   */
  primary(a: string): string;
  /**
   * Wraps a string in a secondary ANSI code.
   * @param a The string to wrap.
   */
  secondary(a: string): string;
  /**
   * Wraps a string in a accent ANSI code.
   * @param a The string to wrap.
   */
  accent?(a: string): string;

  /**
   * Wraps a string in a success ANSI code.
   * @param a The string to wrap.
   */
  success(a: string): string;
  /**
   * Wraps a string in a warning ANSI code.
   * @param a The string to wrap.
   */
  warning(a: string): string;
  /**
   * Wraps a string in a error ANSI code.
   * @param a The string to wrap.
   */
  error(a: string): string;
  /**
   * Wraps a string in a info ANSI code.
   * @param a The string to wrap.
   */
  info?(a: string): string;

  /**
   * Set of symbols for logging.
   */
  symbols?: {
    /**
     * Success message symbol.
     */
    success: string;
    /**
     * Error message symbol.
     */
    error: string;
    /**
     * Fatal error message symbol.
     */
    fatal: string;
    /**
     * Warning message symbol.
     */
    warning: string;
    /**
     * Information message symbol.
     */
    info?: string;
    /**
     * A cursor symbol, used in things like search and select.
     */
    cursor: string;
  };

  /**
   * Optional styles.
   */
  styles?: {
    /**
     * Wraps a string in a bold ANSI code.
     * @param a The string to wrap.
     */
    bold?(a: string): string;
    /**
     * Wraps a string in an italic ANSI code.
     * @param a The string to wrap.
     */
    italic?(a: string): string;
    /**
     * Wraps a string in an underline ANSI code.
     * @param a The string to wrap.
     */
    underline?(a: string): string;
  };

  prompt?: {
    /**
     * Prefix before the message (e.g. "?")
     */
    prefix?(symbol: string): string;

    /**
     * Styles the main message text
     */
    message?(text: string): string;

    /**
     * Styles user input
     */
    input?(text: string): string;

    /**
     * Styles placeholder text
     */
    placeholder?(text: string): string;

    /**
     * Styles default value hint
     */
    default?(text: string): string;

    /**
     * Highlighted (active) option
     */
    highlight?(text: string): string;

    /**
     * Selected option (multi-select)
     */
    selected?(text: string): string;

    /**
     * Dim/disabled option
     */
    inactive?(text: string): string;
  };
}

/**
 * The default theme.
 */
export const DEFAULT_THEME: Theme = {
  primary: color.cyan,
  secondary: color.gray,

  success: color.green,
  warning: color.yellow,
  error: color.red,

  symbols: {
    success: "✔",
    error: "✖",
    fatal: "✖",
    warning: "⚠",
    cursor: "❯",
  },

  styles: {
    bold: color.bold,
    italic: color.italic,
    underline: color.underline,
  },
};

/**
 * Defines a theme.
 * @param theme The (partial) theme.
 * @returns The theme, merged with the default theme.
 */
export function defineTheme(theme: DeepPartial<Theme>): Theme {
  return merge(DEFAULT_THEME, theme);
}
