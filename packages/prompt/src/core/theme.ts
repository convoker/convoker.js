import { DEFAULT_THEME, type Theme } from "@convoker/theme";

let th: Theme = DEFAULT_THEME;

/**
 * Sets the default theme for prompts.
 * @param theme The new theme.
 */
export function setTheme(theme: Theme) {
  th = theme;
}

/**
 * Gets the default theme for prompts.
 * @returns The theme.
 */
export function getTheme(): Theme {
  return th;
}
