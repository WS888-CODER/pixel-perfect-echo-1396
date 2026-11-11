import { describe, expect, it } from "vitest";
import { oppositeTheme, resolveTheme } from "./theme-preference";
describe("Theme preference rules", () => {
  it("uses the dark system preference on a first visit", () => {
    expect(resolveTheme(null, true)).toBe("dark");
  });
  it("uses the light system preference on a first visit", () => {
    expect(resolveTheme(null, false)).toBe("light");
  });
  it("restores saved light mode instead of the dark system preference", () => {
    expect(resolveTheme("light", true)).toBe("light");
  });
  it("restores saved dark mode instead of the light system preference", () => {
    expect(resolveTheme("dark", false)).toBe("dark");
  });
  it("falls back to the system for an invalid stored preference", () => {
    expect(resolveTheme("invalid", true)).toBe("dark");
  });
  it("switches between light and dark modes", () => {
    expect(oppositeTheme("light")).toBe("dark");
    expect(oppositeTheme("dark")).toBe("light");
  });
});
