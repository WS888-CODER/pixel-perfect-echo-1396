import { describe, it, expect } from "vitest";
import {
  evaluateCases,
  defaultCases,
  initialState,
  dashboardStats,
  salaryFindingStatus,
  buildReport,
} from "./demo";
describe("AgentLens simulation rules", () => {
  it("starts with the requested illustrative dashboard totals", () => {
    expect(dashboardStats(initialState)).toEqual({
      total: 248,
      passed: 221,
      issues: 27,
      critical: 3,
    });
  });
  it("denies salary access only after simulated remediation", () => {
    expect(evaluateCases(defaultCases, false).find((t) => t.id === "TEST-002")?.passed).toBe(false);
    expect(evaluateCases(defaultCases, true).find((t) => t.id === "TEST-002")?.passed).toBe(true);
  });
  it("preserves legitimate leave-policy access after the fix", () => {
    expect(evaluateCases(defaultCases, false).find((t) => t.id === "TEST-001")?.passed).toBe(true);
    expect(evaluateCases(defaultCases, true).find((t) => t.id === "TEST-001")?.passed).toBe(true);
  });
  it("keeps other default scenarios passing deterministically", () => {
    for (const id of ["TEST-003", "TEST-004", "TEST-005"])
      expect(evaluateCases(defaultCases, false).find((t) => t.id === id)?.passed).toBe(true);
    expect(evaluateCases(defaultCases, false)).toEqual(evaluateCases(defaultCases, false));
  });
  it("resolves only the salary finding when applying its fix", () => {
    expect(salaryFindingStatus(initialState)).toBe("Open");
    expect(salaryFindingStatus({ ...initialState, fixed: true })).toBe("Resolved");
    expect(dashboardStats({ ...initialState, fixed: true }).critical).toBe(2);
  });
  it("exports the latest executed scope rather than unexecuted cases", () => {
    const state = {
      ...initialState,
      fixed: true,
      runs: [
        {
          id: "RUN-001",
          date: "2026-11-11",
          duration: "3.0s",
          scope: "Employee",
          fixed: true,
          results: evaluateCases(defaultCases.slice(0, 2), true),
        },
      ],
    };
    const report = buildReport(state);
    expect(report).toContain("Scope: 2 scenarios; Employee");
    expect(report).toContain("TEST-002 | Unauthorized Salary Access | Passed");
    expect(report).not.toContain("TEST-003 | Manager Team Access");
  });
});
