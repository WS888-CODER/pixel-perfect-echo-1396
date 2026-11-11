import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { RotateCcw, ShieldCheck, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { initialState } from "./demo";
import { useDemo } from "./state";
import { PageHeading, Panel } from "./shared";
export function SettingsPage() {
  const { state, update } = useDemo();
  const [reset, setReset] = useState(false);
  return (
    <>
      <PageHeading
        title="Settings"
        description="Manage your fictional workspace and demo preferences."
      />
      <Panel title="Workspace" subtitle="Acme Organization · Demo environment">
        <dl className="detail-list">
          <div>
            <dt>Organization</dt>
            <dd>Acme Organization (fictional)</dd>
          </div>
          <div>
            <dt>Administrator</dt>
            <dd>Jordan Davis (fictional)</dd>
          </div>
          <div>
            <dt>Storage</dt>
            <dd>Local browser demo state</dd>
          </div>
          <div>
            <dt>External integrations</dt>
            <dd>None · simulation only</dd>
          </div>
        </dl>
        <div className="setting-row">
          <div>
            <h3>Assessment notifications</h3>
            <p>Demo workspace notification preference</p>
          </div>
          <Switch
            aria-label="Assessment notifications"
            checked={state.notifications}
            onCheckedChange={(value) => {
              update((s) => ({ ...s, notifications: value }));
              toast.success("Notification preference saved");
            }}
          />
        </div>
      </Panel>
      <Panel
        title="Reset Demo"
        subtitle="Restore the initial scenarios, findings, and assistant configuration"
      >
        <Button variant="outline" onClick={() => setReset(true)}>
          <RotateCcw />
          Reset Demo Workspace
        </Button>
      </Panel>
      <Dialog open={reset} onOpenChange={setReset}>
        <DialogContent>
          <DialogTitle>Reset demo workspace?</DialogTitle>
          <DialogDescription>
            This removes local test history, custom cases, and simulated remediation. No real data
            is affected.
          </DialogDescription>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setReset(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                update(() => initialState);
                setReset(false);
                toast.success("Demo restored to its initial state");
              }}
            >
              Confirm Reset
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function HelpPage() {
  return (
    <>
      <PageHeading
        title="Help & Documentation"
        description="Assessment methodology, evidence boundaries, and demo reference."
      />
      <div className="two-columns">
        <Panel title="Assessment Methodology" subtitle="AgentLens demonstration reference">
          <div className="doc-content">
            <h3>Security & quality scope</h3>
            <p>
              The default HR suite covers approved-source accuracy, unsupported answers, salary
              access, manager boundaries, and instruction compliance. Bias is an illustrative
              reporting category, not part of the five executed default cases.
            </p>
            <h3>Deterministic simulation</h3>
            <p>
              TEST-002 fails before simulated remediation and passes afterward. Other default
              scenarios remain passing. Custom cases use a predefined passing response; no live
              model is called.
            </p>
            <h3>Evidence & lineage</h3>
            <p>
              AL-024 has fictional retrieval logs and confirmed demo document relationships.
              Historical findings without logs do not show confirmed source lineage.
            </p>
          </div>
        </Panel>
        <Panel title="Demo Reference" subtitle="Fictional HR assistant workspace">
          <div className="doc-content">
            <h3>Role-based access</h3>
            <p>
              Employees can view policies and their personal records. Managers are limited to their
              assigned teams. HR Administrators can access records only within assigned permissions.
            </p>
            <h3>Remediation boundaries</h3>
            <p>
              Simulated fixes update local state, not a real company system. Rerun affected tests to
              validate the expected outcome while preserving legitimate leave-policy access.
            </p>
            <h3>Reports & limitations</h3>
            <p>
              Export produces a printable assessment with scope, actual demo results, evidence
              references, remediation status, and limitations. Scores are illustrative and never
              certify complete AI security.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/test-runs">
              <BookOpen />
              Open Test Runs
              <ArrowRight />
            </Link>
          </Button>
        </Panel>
      </div>
      <div className="notice">
        <ShieldCheck />
        No external API keys, live company systems, or real personal data are used.
      </div>
    </>
  );
}
