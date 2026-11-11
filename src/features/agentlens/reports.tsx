import { Link } from "@tanstack/react-router";
import { Bot, ShieldCheck, ArrowRight, FileBarChart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "./state";
import { reportScope } from "./demo";
import { PageHeading, Panel, Status, ExportButton, MiniBar } from "./shared";
export function Reports() {
  const { state } = useDemo();
  const results = reportScope(state);
  const retested = state.runs.some(
    (r) => r.fixed && r.results.some((t) => t.id === "TEST-002" && t.passed),
  );
  const scores = [
    ["Answer Accuracy", 96],
    ["Hallucination Checks", 88],
    ["Instruction Compliance", 98],
    ["Access Control", 100],
    ["Bias Evaluation", 84],
  ] as const;
  return (
    <>
      <PageHeading
        title="Reliability Reports"
        description="Measure AI assistant quality, security, and reliability across test runs."
      >
        <ExportButton />
      </PageHeading>
      <div className="report-score-band">
        <div className="score-ring">
          <strong>94</strong>
          <span>/100</span>
        </div>
        <div className="grow">
          <div className="inline-title">
            <Bot size={22} />
            <h2>{state.assistantName}</h2>
            <Status tone="primary">Illustrative Score</Status>
          </div>
          <p>Illustrative assessment metric — not a certified security guarantee.</p>
          <div className="report-score-meta">
            <span>HR language model</span>
            <span>Version v1.2</span>
            <span>{state.runs.length} completed assessments</span>
          </div>
        </div>
        <ShieldCheck className="score-shield" size={70} />
      </div>
      <div className="two-columns">
        <Panel
          title="Evaluation Categories"
          subtitle="Illustrative sample scores, not calculated from live execution"
        >
          {scores.map(([name, value]) => (
            <div className="score-category" key={name}>
              <div>
                <span>{name}</span>
                <strong>{value}%</strong>
              </div>
              <MiniBar value={value} tone={name === "Access Control" ? "success" : "primary"} />
            </div>
          ))}
        </Panel>
        <Panel
          title="Latest Assessment Scope"
          subtitle={
            state.runs.length
              ? "Current results from the latest simulated run"
              : "Reference baseline"
          }
        >
          <dl className="detail-list">
            <div>
              <dt>Scenarios evaluated</dt>
              <dd>{results.length}</dd>
            </div>
            <div>
              <dt>Passed / failed</dt>
              <dd>
                {results.filter((r) => r.passed).length} / {results.filter((r) => !r.passed).length}
              </dd>
            </div>
            <div>
              <dt>Roles in scope</dt>
              <dd>{[...new Set(results.map((r) => r.role))].join(", ")}</dd>
            </div>
            <div>
              <dt>Remediation</dt>
              <dd>{state.fixed ? "Applied (simulated)" : "Not applied"}</dd>
            </div>
            <div>
              <dt>Validation rerun</dt>
              <dd>{retested ? "Salary-access scenario passed" : "Not yet validated after fix"}</dd>
            </div>
          </dl>
          <Button variant="outline" asChild>
            <Link to="/test-runs">
              View Test Runs
              <ArrowRight />
            </Link>
          </Button>
        </Panel>
      </div>
      <Panel
        title="Before & After Remediation"
        subtitle="Preserving legitimate access while closing the tested security gap"
      >
        <div className="comparison-caption">
          <Status tone={retested ? "success" : "neutral"}>
            {retested ? "Validated in simulated rerun" : "Illustrative target comparison"}
          </Status>
          <span>
            {retested
              ? "Latest assessment rerun shown below"
              : "After-fix outcomes below are illustrative until rerun"}
          </span>
        </div>
        <div className="table-scroll">
          <table className="data-table comparison-table">
            <thead>
              <tr>
                <th>Test scenario</th>
                <th>Before remediation · v1.1</th>
                <th>After remediation · v1.2</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Unauthorized Salary Access", false],
                ["Leave Policy Accuracy", true],
                ["Personal Data Access", false],
              ].map(([name, passed]) => (
                <tr key={String(name)}>
                  <td>
                    <strong>{name}</strong>
                    {name === "Personal Data Access" && (
                      <small className="table-small">
                        Illustrative comparison only · not in the executed five-case suite
                      </small>
                    )}
                  </td>
                  <td>
                    <Status>{passed ? "Passed" : "Failed"}</Status>
                  </td>
                  <td>
                    <Status>Passed</Status>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="notice notice-success">
          <Check />
          <span>
            The tested access-control fix preserves permitted leave-policy functionality.{" "}
            {retested
              ? "Salary access was validated in a simulated rerun."
              : "Run the affected suite to validate the simulated fix."}
          </span>
        </div>
      </Panel>
      <Panel
        title="Version Comparison"
        subtitle="Illustrative reference metrics; not a live version deployment"
      >
        <div className="version-comparison">
          <div>
            <span className="version-label">v1.1 · BEFORE FIX</span>
            <h3>Baseline assessment</h3>
            <div className="version-values">
              <div>
                <span>Pass rate</span>
                <strong>80%</strong>
              </div>
              <div>
                <span>Critical findings</span>
                <strong>3</strong>
              </div>
            </div>
            <p>Salary access: Failed · Nov 10, 2026</p>
          </div>
          <ArrowRight />
          <div>
            <span className="version-label">v1.2 · AFTER FIX TARGET</span>
            <h3>Remediated assessment</h3>
            <div className="version-values">
              <div>
                <span>Pass rate</span>
                <strong className="positive">100%</strong>
              </div>
              <div>
                <span>Critical findings</span>
                <strong>{state.fixed ? 2 : "2 (target)"}</strong>
              </div>
            </div>
            <p>Salary access: Passed (target) · Nov 11, 2026</p>
          </div>
        </div>
      </Panel>
      <div className="scope-note report-limitations">
        <FileBarChart size={21} />
        <div>
          <h3>Assessment Scope & Limitations</h3>
          <p>
            All results and data are fictional simulations. Findings reflect the scenarios actually
            tested and do not establish complete AI security. Source lineage requires available
            retrieval logs. Custom test cases use predefined passing responses. Illustrative scores
            and comparisons are not certifications.
          </p>
        </div>
      </div>
    </>
  );
}
