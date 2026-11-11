import { Link } from "@tanstack/react-router";
import { ShieldCheck, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useDemo } from "./state";
import { PageHeading, Panel } from "./shared";
export function SettingsPage() {
  const { state, update } = useDemo();
  return (
    <>
      <PageHeading
        title="Settings"
        description="Manage your workspace and notification preferences."
      />
      <Panel title="Workspace" subtitle="Acme Organization">
        <dl className="detail-list">
          <div>
            <dt>Organization</dt>
            <dd>Acme Organization</dd>
          </div>
          <div>
            <dt>Administrator</dt>
            <dd>Jordan Davis</dd>
          </div>
          <div>
            <dt>Storage</dt>
            <dd>Local browser storage</dd>
          </div>
          <div>
            <dt>External integrations</dt>
            <dd>None · simulation only</dd>
          </div>
        </dl>
        <div className="setting-row">
          <div>
            <h3>Assessment notifications</h3>
            <p>Workspace notification preference</p>
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
    </>
  );
}
export function HelpPage() {
  return (
    <>
      <PageHeading
        title="Help & Documentation"
        description="Assessment methodology, evidence boundaries, and assessment reference."
      />
      <div className="two-columns">
        <Panel title="Assessment Methodology" subtitle="AgentLens assessment reference">
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
              AL-024 has fictional retrieval logs and confirmed simulated document relationships.
              Historical findings without logs do not show confirmed source lineage.
            </p>
          </div>
        </Panel>
        <Panel title="HR Assistant Reference" subtitle="Fictional HR assistant workspace">
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
              Export produces a printable assessment with scope, simulated assessment results,
              evidence references, remediation status, and limitations. Scores are illustrative and
              never certify complete AI security.
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
