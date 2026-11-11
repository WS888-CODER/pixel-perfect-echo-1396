import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Plus,
  Play,
  FlaskConical,
  CheckCircle2,
  Clock,
  ShieldAlert,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useDemo } from "./state";
import { evaluateCases, type TestCase, type Category, type Role, type Result } from "./demo";
import {
  PageHeading,
  Panel,
  Status,
  SearchField,
  SelectField,
  MiniBar,
  AssessmentButton,
} from "./shared";
const categories = [
  "Answer Accuracy",
  "Hallucination",
  "Access Control",
  "Instruction Compliance",
  "Bias",
];
function TestDetail({ test, close }: { test: TestCase | Result | null; close: () => void }) {
  return (
    <Dialog open={!!test} onOpenChange={(o) => !o && close()}>
      <DialogContent>
        <DialogTitle>{test?.title}</DialogTitle>
        <DialogDescription>
          {test?.id} · {test?.category} · {test?.role}
        </DialogDescription>
        <div className="evidence-block">
          <span>USER PROMPT</span>
          <p>{test?.prompt}</p>
        </div>
        <div className="evidence-block">
          <span>EXPECTED RESULT</span>
          <p>{test?.expected}</p>
        </div>
        {test && "actual" in test && (
          <div className="evidence-block">
            <span>SIMULATED ACTUAL RESULT</span>
            <p>{test.actual}</p>
            <Status>{test.passed ? "Passed" : "Failed"}</Status>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
export function TestSuites() {
  const { state, update } = useDemo();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All statuses");
  const [adding, setAdding] = useState(false);
  const [detail, setDetail] = useState<TestCase | null>(null);
  const [newCategory, setNewCategory] = useState("Answer Accuracy");
  const [role, setRole] = useState("Employee");
  const rows = evaluateCases(state.cases, state.fixed).filter(
    (t) =>
      `${t.id} ${t.title} ${t.prompt}`.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All categories" || category === t.category) &&
      (status === "All statuses" || (t.passed ? "Passed" : "Failed") === status),
  );
  return (
    <>
      <PageHeading
        title="Test Suites"
        description="Create and manage automated AI testing scenarios."
      >
        <Button variant="outline" onClick={() => setAdding(true)}>
          <Plus />
          Add Test Case
        </Button>
        <AssessmentButton label="Run Test Suite" />
      </PageHeading>
      <Panel>
        <div className="suite-header">
          <div className="assistant-avatar">
            <FlaskConical size={26} />
          </div>
          <div>
            <h2>HR Assistant Security & Quality Suite</h2>
            <p>
              A comprehensive suite for evaluating accuracy, access permissions, and instruction
              compliance.
            </p>
          </div>
          <Status tone="primary">{state.cases.length} test cases</Status>
        </div>
        <div className="suite-categories">
          {[
            "Answer Accuracy",
            "Hallucination Detection",
            "Access Control",
            "Instruction Compliance",
            "Bias Evaluation",
          ].map((c) => (
            <span key={c}>
              <CheckCircle2 size={13} />
              {c}
            </span>
          ))}
        </div>
      </Panel>
      <Panel>
        <div className="filters">
          <SearchField value={search} onChange={setSearch} placeholder="Search test cases..." />
          <SelectField
            label="Category"
            value={category}
            onChange={setCategory}
            options={["All categories", ...categories]}
          />
          <SelectField
            label="Status"
            value={status}
            onChange={setStatus}
            options={["All statuses", "Passed", "Failed"]}
          />
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Test case</th>
                <th>Category</th>
                <th>User role</th>
                <th>Expected status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id}>
                  <td>
                    <Button className="table-link" variant="link" onClick={() => setDetail(t)}>
                      {t.title}
                    </Button>
                    <small className="table-small">{t.id}</small>
                  </td>
                  <td>{t.category}</td>
                  <td>{t.role}</td>
                  <td>
                    <Status>{t.passed ? "Passed" : "Failed"}</Status>
                  </td>
                  <td>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`View ${t.id}`}
                      onClick={() => setDetail(t)}
                    >
                      <ChevronRight />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!rows.length && <div className="empty-state">No test cases match these filters.</div>}
        </div>
        <div className="table-footer">{rows.length} scenarios · predefined simulation outcomes</div>
      </Panel>
      <TestDetail test={detail} close={() => setDetail(null)} />
      <Dialog open={adding} onOpenChange={setAdding}>
        <DialogContent>
          <DialogTitle>Add Test Case</DialogTitle>
          <DialogDescription>
            Custom cases use a predefined passing simulation, not a live AI evaluation.
          </DialogDescription>
          <form
            className="test-form"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              update((s) => ({
                ...s,
                cases: [
                  ...s.cases,
                  {
                    id: `TEST-${String(Math.max(0, ...s.cases.map((c) => Number(c.id.split("-")[1]) || 0)) + 1).padStart(3, "0")}`,
                    title: String(data.get("title")),
                    prompt: String(data.get("prompt")),
                    expected: String(data.get("expected")),
                    category: newCategory as Category,
                    role: role as Role,
                  },
                ],
              }));
              setAdding(false);
              toast.success("Test case added to the demo suite");
            }}
          >
            <label className="form-label">
              Test name
              <input name="title" required />
            </label>
            <div className="two-fields">
              <SelectField
                label="Category"
                value={newCategory}
                onChange={setNewCategory}
                options={categories}
              />
              <SelectField
                label="User role"
                value={role}
                onChange={setRole}
                options={["Employee", "Manager", "HR Administrator"]}
              />
            </div>
            <label className="form-label">
              Prompt
              <textarea name="prompt" required />
            </label>
            <label className="form-label">
              Expected result
              <textarea name="expected" required />
            </label>
            <Button type="submit">
              <Plus />
              Create Test Case
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function TestRuns() {
  const { state, update, hydrated } = useDemo();
  const navigate = useNavigate();
  const [role, setRole] = useState("All Roles");
  const [suite, setSuite] = useState("HR Assistant Security & Quality Suite");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Result[] | null>(null);
  const [detail, setDetail] = useState<Result | null>(null);
  const [selectedRun, setSelectedRun] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );
  const cases = state.cases.filter(
    (c) =>
      (role === "All Roles" || c.role === role) &&
      (suite !== "Affected Access Control Tests" || ["TEST-001", "TEST-002"].includes(c.id)),
  );
  const displayed =
    results ?? state.runs.find((r) => r.id === selectedRun)?.results ?? state.runs.at(-1)?.results;
  function run() {
    const captured = evaluateCases(cases, state.fixed);
    if (!captured.length) {
      toast.info("No test cases match this role and suite.");
      return;
    }
    setRunning(true);
    setProgress(0);
    setResults(null);
    let tick = 0;
    timer.current = setInterval(() => {
      tick++;
      setProgress(Math.min(100, tick * 20));
      if (tick === 5) {
        if (timer.current) clearInterval(timer.current);
        setRunning(false);
        setResults(captured);
        update((s) => ({
          ...s,
          runs: [
            ...s.runs,
            {
              id: `RUN-${String(s.runs.length + 1).padStart(3, "0")}`,
              date: new Date().toISOString(),
              results: captured,
              fixed: s.fixed,
              duration: "3.0s",
              scope: `${suite} · ${role}`,
            },
          ],
        }));
        toast.success("Simulated assessment completed");
      }
    }, 600);
  }
  return (
    <>
      <PageHeading title="Test Runs" description="Execute and monitor AI assistant evaluations." />
      <Panel title="New Assessment" subtitle="Configure the scope of your simulated evaluation">
        <div className="run-config">
          <SelectField
            label="Assistant"
            value={state.assistantName}
            onChange={() => {}}
            options={[state.assistantName]}
          />
          <SelectField
            label="Test suite"
            value={suite}
            onChange={setSuite}
            options={["HR Assistant Security & Quality Suite", "Affected Access Control Tests"]}
          />
          <SelectField
            label="User roles"
            value={role}
            onChange={setRole}
            options={["All Roles", "Employee", "Manager", "HR Administrator"]}
          />
          <Button onClick={run} disabled={running || !hydrated || !cases.length}>
            <Play />
            {running ? "Running Tests..." : "Run Tests"}
          </Button>
        </div>
        <div className="panel-toolbar">
          <span>
            <FlaskConical size={14} />
            {cases.length} test cases selected
          </span>
          <span>
            <ShieldAlert size={14} />
            Local simulation · no live model execution
          </span>
        </div>
      </Panel>
      {running && (
        <Panel
          title="Assessment in Progress"
          subtitle="Executing predefined demonstration scenarios"
        >
          <div className="progress-heading">
            <span>Testing approved sources and access policies</span>
            <strong>{progress}%</strong>
          </div>
          <MiniBar value={progress} />
          <div className="execution-list">
            {cases.map((c, i) => (
              <div key={c.id}>
                <Status tone={progress >= ((i + 1) / cases.length) * 100 ? "success" : "neutral"}>
                  {progress >= ((i + 1) / cases.length) * 100 ? "Evaluated" : "Queued"}
                </Status>
                <span>{c.title}</span>
              </div>
            ))}
          </div>
        </Panel>
      )}
      {!running && displayed && (
        <>
          <div className="run-summary">
            <div>
              <span>Total tests</span>
              <strong>{displayed.length}</strong>
            </div>
            <div>
              <span>Passed</span>
              <strong className="positive">{displayed.filter((r) => r.passed).length}</strong>
            </div>
            <div>
              <span>Failed</span>
              <strong className="negative">{displayed.filter((r) => !r.passed).length}</strong>
            </div>
            <div>
              <span>Duration</span>
              <strong>
                3.0<span>s</span>
              </strong>
            </div>
            <div>
              <span>Assessment status</span>
              <Status>Completed</Status>
            </div>
          </div>
          <Panel
            title="Assessment Results"
            subtitle="Simulated responses for the selected test scope"
            action={
              <Button variant="outline" asChild>
                <Link to="/reports">
                  View Report
                  <ChevronRight />
                </Link>
              </Button>
            }
          >
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Test case</th>
                    <th>Category / role</th>
                    <th>Expected result</th>
                    <th>Actual result</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {displayed.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <Button
                          variant="link"
                          className="table-link"
                          onClick={() => {
                            if (!r.passed && r.id === "TEST-002")
                              navigate({ to: "/findings/$id", params: { id: "AL-024" } });
                            else setDetail(r);
                          }}
                        >
                          {r.title}
                        </Button>
                        <small className="table-small">{r.id}</small>
                      </td>
                      <td>
                        {r.category}
                        <small className="table-small">{r.role}</small>
                      </td>
                      <td className="long-cell">{r.expected}</td>
                      <td className="long-cell">{r.actual}</td>
                      <td>
                        <Status>{r.passed ? "Passed" : "Failed"}</Status>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </>
      )}
      {!running && !displayed && (
        <div className="empty-state assessment-empty">
          <div className="assistant-avatar">
            <FlaskConical size={30} />
          </div>
          <h2>No assessments run yet</h2>
          <p>HR Assistant · {cases.length} selected scenarios · simulated evaluation</p>
        </div>
      )}
      <Panel title="Run History" subtitle={`${state.runs.length} completed simulated assessments`}>
        <div className="history-list">
          {[...state.runs].reverse().map((r) => (
            <div key={r.id}>
              <Clock size={17} />
              <div>
                <strong>{r.id}</strong>
                <span>
                  {new Date(r.date).toLocaleString()} · {r.scope}
                </span>
              </div>
              <Status>{r.results.every((t) => t.passed) ? "Passed" : "Failed"}</Status>
              <Button
                variant="ghost"
                onClick={() => {
                  setResults(null);
                  setSelectedRun(r.id);
                }}
              >
                View results
                <ChevronRight size={14} />
              </Button>
            </div>
          ))}
          {!state.runs.length && (
            <p className="empty-state">Your completed assessments will appear here.</p>
          )}
        </div>
      </Panel>
      <TestDetail test={detail} close={() => setDetail(null)} />
    </>
  );
}
