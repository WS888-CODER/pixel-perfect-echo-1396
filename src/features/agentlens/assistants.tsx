import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bot,
  FileText,
  LockKeyhole,
  ArrowDown,
  Users,
  Cable,
  Pencil,
  ArrowRight,
  Check,
  X,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useDemo } from "./state";
import { roles } from "./demo";
import { PageHeading, Panel, Status, AssessmentButton } from "./shared";
export function Assistants() {
  const { state, update } = useDemo();
  const [modal, setModal] = useState("");
  const [name, setName] = useState(state.assistantName);
  return (
    <>
      <PageHeading
        title="AI Assistants"
        description="Manage and evaluate your connected AI assistants."
      >
        <AssessmentButton label="Run Tests" />
      </PageHeading>
      <Panel>
        <div className="assistant-overview">
          <div className="assistant-avatar large">
            <Bot size={34} />
          </div>
          <div className="grow">
            <div className="inline-title">
              <h2>{state.assistantName}</h2>
              <Status>Connected</Status>
            </div>
            <p>
              An internal HR assistant that answers employee questions using organizational
              documents.
            </p>
            <div className="assistant-facts">
              <span>
                Model <strong>HR language model</strong>
              </span>
              <span>
                Version <strong>v1.2</strong>
              </span>
              <span>
                Test roles <strong>3</strong>
              </span>
              <span>
                Knowledge sources <strong>3</strong>
              </span>
              <span>
                Last assessment <strong>Today</strong>
              </span>
            </div>
          </div>
        </div>
        <div className="panel-toolbar">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setModal("details")}>
              View Details
              <ArrowRight />
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setName(state.assistantName);
                setModal("configure");
              }}
            >
              <Pencil />
              Configure Assistant
            </Button>
          </div>
        </div>
      </Panel>
      <div className="section-title">
        <h2>User Roles & Permissions</h2>
        <span>3 configured roles</span>
      </div>
      <div className="roles-grid">
        {roles.map((role) => (
          <Panel key={role.name}>
            <div className="role-title">
              <Users size={20} />
              <h3>{role.name}</h3>
            </div>
            <div className="role-label">ALLOWED</div>
            {role.allowed.map((p) => (
              <div className="permission" key={p}>
                <Check size={15} />
                {p}
              </div>
            ))}
            <div className="role-label">NOT ALLOWED</div>
            {role.denied.map((p) => (
              <div className="permission denied" key={p}>
                <X size={15} />
                {p}
              </div>
            ))}
          </Panel>
        ))}
      </div>
      <div className="two-columns">
        <Panel title="Knowledge Sources" subtitle="Approved documents and inherited permissions">
          <div className="document-row">
            <FileText />
            <div>
              <strong>Employee Leave Policy.pdf</strong>
              <span>Approved HR policy</span>
            </div>
            <Status tone="neutral">Public/Internal</Status>
          </div>
          <div className="document-row">
            <LockKeyhole />
            <div>
              <strong>Employee Salary Records.xlsx</strong>
              <span>Original confidential source</span>
            </div>
            <Status tone="danger">Restricted</Status>
          </div>
          <div className="derived-link">
            <ArrowDown size={16} />
            Derived from Employee Salary Records.xlsx
          </div>
          <div className="document-row derived">
            <FileText />
            <div>
              <strong>Department Expense Summary.pdf</strong>
              <span>
                {state.fixed ? "Restricted access inherited" : "Permission inheritance missing"}
              </span>
            </div>
            <Status tone={state.fixed ? "danger" : "warning"}>
              {state.fixed ? "Restricted" : "Internal"}
            </Status>
          </div>
          <div className="notice">
            <ShieldCheck size={19} />
            <span>
              Access permissions should be inherited or explicitly enforced for derived information.
            </span>
          </div>
        </Panel>
        <Panel title="Integration" subtitle="Connection configuration">
          <div className="integration-mark">
            <Cable size={30} />
            <Status>Connected</Status>
          </div>
          <dl className="detail-list">
            <div>
              <dt>API endpoint</dt>
              <dd>HR Assistant Connector</dd>
            </div>
            <div>
              <dt>Connection status</dt>
              <dd>Local adapter</dd>
            </div>
            <div>
              <dt>Authentication</dt>
              <dd>Not configured</dd>
            </div>
            <div>
              <dt>Last sync</dt>
              <dd>Today</dd>
            </div>
          </dl>
          <Button variant="outline" onClick={() => setModal("integration")}>
            <Cable />
            Configure Integration
          </Button>
        </Panel>
      </div>
      <Dialog open={!!modal} onOpenChange={(open) => !open && setModal("")}>
        <DialogContent>
          <DialogTitle>
            {modal === "configure"
              ? "Configure Assistant"
              : modal === "details"
                ? state.assistantName
                : "HR Assistant Connector"}
          </DialogTitle>
          <DialogDescription>
            Fictional local simulation; no external system is connected.
          </DialogDescription>
          {modal === "configure" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                update((s) => ({ ...s, assistantName: name.trim() || "HR Assistant" }));
                setModal("");
                toast.success("Assistant configuration saved");
              }}
            >
              <label className="form-label">
                Assistant name
                <input required value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <Button type="submit">Save Configuration</Button>
            </form>
          ) : modal === "details" ? (
            <>
              <dl className="detail-list">
                <div>
                  <dt>Version</dt>
                  <dd>v1.2</dd>
                </div>
                <div>
                  <dt>Sources / roles</dt>
                  <dd>3 documents / 3 roles</dd>
                </div>
                <div>
                  <dt>Assessment history</dt>
                  <dd>{state.runs.length} completed assessments</dd>
                </div>
              </dl>
              <Button asChild onClick={() => setModal("")}>
                <Link to="/test-runs">View Test History</Link>
              </Button>
            </>
          ) : (
            <>
              <div className="notice">
                API keys and external endpoints are intentionally disabled in this prototype.
              </div>
              <label className="form-label">
                Connection name
                <input value="HR Assistant Connector" readOnly />
              </label>
              <Button
                onClick={() => {
                  setModal("");
                  toast.success("Simulated connection verified");
                }}
              >
                Verify Connection
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
