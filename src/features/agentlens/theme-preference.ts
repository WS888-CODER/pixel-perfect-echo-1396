export type Theme = "light" | "dark";
export const themeStorageKey = "agentlens-theme";
export function resolveTheme(saved: string | null, systemDark: boolean): Theme {
  return saved === "light" || saved === "dark" ? saved : systemDark ? "dark" : "light";
}
export function oppositeTheme(theme: Theme): Theme {
  return theme === "dark" ? "light" : "dark";
}
