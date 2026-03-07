import { DEFAULT_THEME, type Theme } from "./theme";

let theme: Theme = DEFAULT_THEME;

export function setTheme(th: Theme) {
  theme = th;
}

export function getTheme() {
  return theme;
}
