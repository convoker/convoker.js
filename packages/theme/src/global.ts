import type { Theme } from "./theme";

let theme: Theme;

export function setTheme(th: Theme) {
  theme = th;
}

export function getTheme() {
  return theme;
}
