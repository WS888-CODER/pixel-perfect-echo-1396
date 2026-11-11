import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { oppositeTheme, resolveTheme, themeStorageKey, type Theme } from "./theme-preference";
const ThemeContext = createContext<{ theme: Theme; ready: boolean; toggle: () => void } | null>(
  null,
);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(themeStorageKey);
    } catch {
      /* Storage may be unavailable. */
    }
    setTheme(resolveTheme(saved, system.matches));
    setReady(true);
    const onSystemChange = (event: MediaQueryListEvent) => {
      try {
        saved = localStorage.getItem(themeStorageKey);
      } catch {
        /* Keep the in-memory preference. */
      }
      setTheme(resolveTheme(saved, event.matches));
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === themeStorageKey) {
        saved = event.newValue;
        setTheme(resolveTheme(saved, system.matches));
      }
    };
    system.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      system.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset['theme'] = theme;
  }, [theme, ready]);
  const toggle = () => {
    const next = oppositeTheme(theme);
    setTheme(next);
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {
      /* Theme remains usable without storage. */
    }
  };
  return <ThemeContext.Provider value={{ theme, ready, toggle }}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeProvider is required");
  return context;
}
