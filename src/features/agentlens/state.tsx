import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { initialState, type DemoState } from "./demo";
const StateContext = createContext<{
  state: DemoState;
  update: (fn: (state: DemoState) => DemoState) => void;
  hydrated: boolean;
} | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("agentlens-demo-v1");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          Array.isArray(parsed.cases) &&
          Array.isArray(parsed.runs) &&
          typeof parsed.fixed === "boolean"
        )
          setState({ ...initialState, ...parsed });
      }
    } catch {
      /* Unavailable browser storage leaves the in-memory demo usable. */
    }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem("agentlens-demo-v1", JSON.stringify(state));
      } catch {
        /* Storage can be disabled. */
      }
    }
  }, [state, hydrated]);
  return (
    <StateContext.Provider value={{ state, update: setState, hydrated }}>
      {children}
    </StateContext.Provider>
  );
}
export function useDemo() {
  const context = useContext(StateContext);
  if (!context) throw new Error("DemoProvider is required");
  return context;
}
