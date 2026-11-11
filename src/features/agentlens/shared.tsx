import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  ArrowDownToLine,
  ArrowUpRight,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Eye,
  FileBarChart,
  FlaskConical,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  X,
  Bot,
  Play,
  Check,
  Plus,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { useDemo } from "./state";
import { buildReport, findings, salaryFindingStatus } from "./demo";
import { useTheme } from "./theme";

const nav = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Assistants", path: "/assistants", icon: Bot },
  { name: "Test Suites", path: "/test-suites", icon: FlaskConical },
  { name: "Test Runs", path: "/test-runs", icon: Play },
  { name: "Findings", path: "/findings", icon: ShieldAlert },
  { name: "Reports", path: "/reports", icon: FileBarChart },
] as const;
export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [menu, setMenu] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [profile, setProfile] = useState(false);
  const [search, setSearch] = useState("");
  const { state, hydrated } = useDemo();
  const { theme, ready, toggle } = useTheme();
  const current =
    nav.find((n) => n.path === path || (n.path === "/findings" && path.startsWith("/findings/")))
      ?.name ??
    (path === "/" ? "Overview" : path === "/settings" ? "Settings" : "Help & Documentation");
  return (
    <div className="app-shell" data-ready={hydrated}>
      {menu && <div className="mobile-scrim" onClick={() => setMenu(false)} />}
      <aside className={`sidebar ${menu ? "is-open" : ""}`}>
        <Link to="/dashboard" className="brand" onClick={() => setMenu(false)}>
          <div className="brand-mark">
            <Eye size={24} />
            <ShieldCheck className="brand-shield" size={13} />
          </div>
          <div>
            <strong>AgentLens</strong>
            <span>AI TRUST PLATFORM</span>
          </div>
        </Link>
        <div className="workspace">
          <div className="workspace-icon">A</div>
          <div>
            <strong>Acme Organization</strong>
            <span>Enterprise workspace</span>
          </div>
          <ChevronDown size={14} />
        </div>
        <div className="nav-label">WORKSPACE</div>
        <nav>
          {nav.map((n) => (
            <Link
              key={n.path}
              to={n.path}
              onClick={() => setMenu(false)}
              className={`nav-item ${current === n.name ? "active" : ""}`}
            >
              <n.icon size={19} />
              <span>{n.name}</span>
              {n.name === "Findings" && <span className="nav-count">{state.fixed ? 1 : 2}</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="trust-panel">
            <ShieldCheck size={21} />
            <strong>Trust starts with testing.</strong>
            <span>
              Your next assessment is one
              <br />
              step toward safer AI.
            </span>
            <Button variant="sidebar" asChild>
              <Link to="/test-runs">
                Run an assessment <ArrowUpRight size={15} />
              </Link>
            </Button>
          </div>
          <Link
            to="/settings"
            className={`nav-item ${path === "/settings" ? "active" : ""}`}
            onClick={() => setMenu(false)}
          >
            <Settings size={18} />
            Settings
          </Link>
          <Link
            to="/help"
            className={`nav-item ${path === "/help" ? "active" : ""}`}
            onClick={() => setMenu(false)}
          >
            <CircleHelp size={18} />
            Help & Documentation
            <ArrowUpRight size={14} />
          </Link>
          <Button variant="profile" onClick={() => setProfile(true)}>
            <div className="avatar">JD</div>
            <div>
              <strong>Jordan Davis</strong>
              <span>Workspace administrator</span>
            </div>
            <ChevronDown size={14} />
          </Button>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="topbar-breadcrumb">
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu"
              aria-label="Open navigation"
              onClick={() => setMenu(true)}
            >
              <Menu />
            </Button>
            <span>Workspace</span>
            <ChevronRight size={14} />
            <strong>{current}</strong>
          </div>
          <div className="topbar-actions">
            <div className="global-search">
              <Search size={16} />
              <input
                aria-label="Search workspace"
                placeholder="Search workspace..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <kbd>⌘ K</kbd>
              {search && (
                <div className="search-results">
                  {[
                    ...nav
                      .filter((n) => n.name.toLowerCase().includes(search.toLowerCase()))
                      .map((n) => (
                        <Link key={n.path} to={n.path} onClick={() => setSearch("")}>
                          {n.name}
                          <ChevronRight size={14} />
                        </Link>
                      )),
                    ...findings
                      .filter((f) =>
                        `${f.title} ${f.id}`.toLowerCase().includes(search.toLowerCase()),
                      )
                      .map((f) => (
                        <Link
                          key={f.id}
                          to="/findings/$id"
                          params={{ id: f.id }}
                          onClick={() => setSearch("")}
                        >
                          {f.id} · {f.title}
                        </Link>
                      )),
                  ]}
                  <span>Search pages and findings</span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              disabled={!ready}
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </Button>
            <div className="topbar-divider" />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              title="Notifications"
              onClick={() => setNotifications(true)}
            >
              <Bell size={19} />
              <i className="notification-dot" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Your profile"
              onClick={() => setProfile(true)}
            >
              <span className="avatar avatar-small">JD</span>
            </Button>
          </div>
        </header>
        <main className="page-content">{children}</main>
        <footer className="app-footer">
          <span>
            <ShieldCheck size={14} />
            AgentLens · Test. Detect. Prove. Improve.
          </span>
        </footer>
      </div>
      <Toaster position="bottom-right" />
      <Dialog open={notifications} onOpenChange={setNotifications}>
        <DialogContent>
          <DialogTitle>Workspace notifications</DialogTitle>
          <DialogDescription>Recent assessment activity</DialogDescription>
          <div className="notice">
            <ShieldAlert />
            AL-024 ·{" "}
            {state.fixed
              ? "Simulated remediation applied"
              : "Critical access-control finding detected"}
          </div>
          <p className="text-sm text-muted-foreground">
            {state.notifications
              ? "Assessment notifications are enabled."
              : "Assessment notifications are disabled in Settings."}
          </p>
          <Button asChild onClick={() => setNotifications(false)}>
            <Link to="/findings">Review findings</Link>
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={profile} onOpenChange={setProfile}>
        <DialogContent>
          <DialogTitle>Jordan Davis</DialogTitle>
          <DialogDescription>
            Fictional workspace administrator · Acme Organization
          </DialogDescription>
          <Button asChild onClick={() => setProfile(false)}>
            <Link to="/settings">Workspace settings</Link>
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export function PageHeading({
  title,
  description,
  children,
  eyebrow,
}: {
  title: string;
  description: string;
  children?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="heading-actions">{children}</div>
    </div>
  );
}
export function Status({ children, tone }: { children: ReactNode; tone?: string }) {
  const text = typeof children === "string" ? children : "";
  const resolvedTone =
    tone ??
    (["Passed", "Resolved", "Connected", "Completed"].includes(text)
      ? "success"
      : ["Critical", "Failed"].includes(text)
        ? "danger"
        : ["High", "Open"].includes(text)
          ? "warning"
          : "neutral");
  return (
    <span className={`status status-${resolvedTone}`}>
      <span className="status-dot" />
      {children}
    </span>
  );
}
export function Panel({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      {title && (
        <div className="panel-heading">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
export function FindingTable({
  compact = false,
  search = "",
  severity = "All severities",
  status = "All statuses",
}: {
  compact?: boolean;
  search?: string;
  severity?: string;
  status?: string;
}) {
  const { state } = useDemo();
  const rows = findings
    .map((f) => ({ ...f, status: f.id === "AL-024" ? salaryFindingStatus(state) : f.status }))
    .filter(
      (f) =>
        `${f.id} ${f.title} ${f.category}`.toLowerCase().includes(search.toLowerCase()) &&
        (severity === "All severities" || f.severity === severity) &&
        (status === "All statuses" || f.status === status),
    );
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Finding</th>
            <th>Category</th>
            <th>Severity</th>
            <th>Assistant</th>
            {!compact && <th>Detected</th>}
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((f) => (
            <tr key={f.id}>
              <td>
                <Link to="/findings/$id" params={{ id: f.id }} className="finding-link">
                  <span
                    className={`finding-icon ${f.severity === "Critical" ? "critical" : "high"}`}
                  >
                    <ShieldAlert size={17} />
                  </span>
                  <span>
                    <strong>{f.title}</strong>
                    <small>{f.id}</small>
                  </span>
                </Link>
              </td>
              <td>{f.category}</td>
              <td>
                <Status>{f.severity}</Status>
              </td>
              <td>
                <span className="assistant-cell">
                  <Bot size={15} />
                  {state.assistantName}
                </span>
              </td>
              {!compact && <td className="text-muted-foreground">{f.date}</td>}
              <td>
                <Status tone={f.status === "Open" ? "neutral" : "success"}>{f.status}</Status>
              </td>
              <td>
                <Button variant="ghost" size="icon" asChild aria-label={`Open ${f.id}`}>
                  <Link to="/findings/$id" params={{ id: f.id }}>
                    <ChevronRight size={16} />
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <div className="empty-state">No findings match these filters.</div>}
    </div>
  );
}
export function ExportButton() {
  const { state } = useDemo();
  return (
    <Button
      variant="outline"
      onClick={() => {
        const text = buildReport(state);
        const win = window.open("", "_blank");
        if (!win) {
          const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
          const a = document.createElement("a");
          a.href = url;
          a.download = "AgentLens-simulated-assessment.txt";
          a.click();
          URL.revokeObjectURL(url);
          return;
        }
        const doc = win.document;
        doc.title = "AgentLens · Simulated Assessment";
        const style = doc.createElement("style");
        style.textContent =
          "body{font-family:Arial,sans-serif;margin:48px;color:#142235}pre{white-space:pre-wrap;font:14px/1.7 Arial,sans-serif}button{padding:10px 18px;margin-bottom:24px;cursor:pointer}@media print{button{display:none}body{margin:16px}}";
        doc.head.append(style);
        const button = doc.createElement("button");
        button.textContent = "Print / Save as PDF";
        button.onclick = () => win.print();
        const pre = doc.createElement("pre");
        pre.textContent = text;
        doc.body.append(button, pre);
        doc.close();
      }}
    >
      <ArrowDownToLine size={16} />
      Export Report
    </Button>
  );
}
export function AssessmentButton({ label = "Run New Assessment" }: { label?: string }) {
  return (
    <Button asChild>
      <Link to="/test-runs">
        <Plus size={16} />
        {label}
      </Link>
    </Button>
  );
}
export function SearchField({
  value,
  onChange,
  placeholder = "Search...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="search-field">
      <Search size={16} />
      <input
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <Button variant="ghost" size="icon" aria-label="Clear search" onClick={() => onChange("")}>
          <X size={14} />
        </Button>
      )}
    </div>
  );
}
export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="select-field">
      <span>{label}</span>
      <div>
        <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown size={14} />
      </div>
    </label>
  );
}
export function MiniBar({ value, tone = "primary" }: { value: number; tone?: string }) {
  return (
    <div className={`mini-bar mini-bar-${tone}`}>
      <progress max={100} value={value} />
    </div>
  );
}
export { Activity, ArrowUpRight, ShieldCheck, ShieldAlert, Bot, Play, Check, Sparkles, BookOpen };
