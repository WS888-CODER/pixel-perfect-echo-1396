import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowUpRight,
  ArrowRight,
  CheckCheck,
  FlaskConical,
  ShieldAlert,
  TriangleAlert,
  ChevronDown,
  Bot,
  ShieldCheck,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "./state";
import { dashboardStats } from "./demo";
import {
  PageHeading,
  Panel,
  Status,
  FindingTable,
  ExportButton,
  AssessmentButton,
  MiniBar,
} from "./shared";
const week = [
  { day: "Nov 05", passed: 26, failed: 5 },
  { day: "Nov 06", passed: 33, failed: 3 },
  { day: "Nov 07", passed: 28, failed: 6 },
  { day: "Nov 08", passed: 38, failed: 3 },
  { day: "Nov 09", passed: 31, failed: 5 },
  { day: "Nov 10", passed: 35, failed: 3 },
  { day: "Nov 11", passed: 30, failed: 2 },
];
const categories = [
  { name: "Access Control", value: 11, color: "var(--primary)" },
  { name: "Hallucination", value: 7, color: "var(--cyan)" },
  { name: "Instruction Compliance", value: 5, color: "var(--navy)" },
  { name: "Bias", value: 2, color: "var(--warning)" },
  { name: "Accuracy", value: 2, color: "var(--chart-soft)" },
];
export function Overview() {
  const { state } = useDemo();
  const stats = dashboardStats(state);
  const [period, setPeriod] = useState("Last 7 days");
  const metrics = [
    {
      label: "Total Tests",
      value: stats.total,
      icon: FlaskConical,
      tone: "blue",
      trend: "+12.8%",
      detail: "vs. previous period",
      points: "0,30 12,24 24,26 36,16 48,19 60,10 72,12 84,3",
    },
    {
      label: "Passed Tests",
      value: stats.passed,
      icon: CheckCheck,
      tone: "green",
      trend: `${((stats.passed / stats.total) * 100).toFixed(1)}%`,
      detail: "overall pass rate",
      points: "0,28 12,26 24,18 36,23 48,11 60,13 72,5 84,3",
    },
    {
      label: "Issues Detected",
      value: stats.issues,
      icon: ShieldAlert,
      tone: "amber",
      trend: "5 categories",
      detail: "across all assessments",
      points: "0,9 12,17 24,11 36,21 48,17 60,24 72,19 84,27",
    },
    {
      label: "Critical Findings",
      value: stats.critical,
      icon: TriangleAlert,
      tone: "red",
      trend: state.fixed ? "1 remediated" : "Action required",
      detail: "prioritize remediation",
      points: "0,26 12,25 24,19 36,19 48,13 60,13 72,7 84,7",
    },
  ];
  return (
    <>
      <PageHeading
        title="Overview"
        description="Monitor your AI assistants’ security, quality, and reliability."
      >
        <ExportButton />
        <AssessmentButton />
      </PageHeading>
      <div className="overview-notice">
        <span className="notice-symbol">
          <ShieldCheck size={19} />
        </span>
        <div>
          <strong>Confidence in every AI interaction.</strong>
          <span> Your workspace at a glance — from evaluation to remediation.</span>
        </div>
        <span className="live-label">
          <Radio size={13} />
          Simulated data
        </span>
      </div>
      <div className="metrics-grid">
        {metrics.map((m) => (
          <div className={`metric-card metric-${m.tone}`} key={m.label}>
            <div className="metric-top">
              <span>{m.label}</span>
              <div className="metric-icon">
                <m.icon size={18} />
              </div>
            </div>
            <div className="metric-value">
              <strong>{m.value}</strong>
              <svg
                className="sparkline"
                viewBox="0 0 84 36"
                aria-label={`${m.label} illustrative trend`}
              >
                <polyline points={m.points} />
              </svg>
            </div>
            <div className="metric-bottom">
              <span>
                {m.tone === "blue" && <ArrowUpRight size={13} />} {m.trend}
              </span>
              <small>{m.detail}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="charts-grid">
        <Panel
          title="Test Results Over Time"
          subtitle="A daily view of your assessment performance"
          action={
            <label className="period-select">
              <select
                aria-label="Chart time period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option>Last 7 days</option>
                <option>Last 3 days</option>
              </select>
              <ChevronDown size={14} />
            </label>
          }
        >
          <div className="chart-legend">
            <span>
              <i className="legend-dot passed" />
              Passed tests
            </span>
            <span>
              <i className="legend-dot failed" />
              Failed tests
            </span>
          </div>
          <div className="area-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={period === "Last 7 days" ? week : week.slice(-3)}
                margin={{ left: -23, right: 12, top: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="passedFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="4 4" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  dy={12}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  domain={[0, 50]}
                  ticks={[0, 10, 20, 30, 40, 50]}
                />
                <Tooltip />
                <Area
                  isAnimationActive={false}
                  type="monotone"
                  dataKey="passed"
                  name="Passed tests"
                  stroke="var(--primary)"
                  fill="url(#passedFill)"
                  strokeWidth={2.5}
                />
                <Area
                  isAnimationActive={false}
                  type="monotone"
                  dataKey="failed"
                  name="Failed tests"
                  stroke="var(--danger)"
                  fill="transparent"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-footer">
            <span>
              <span className="positive">↑ 8.2%</span> improvement in pass rate
            </span>
            <span>Illustrative 7-day trend</span>
          </div>
        </Panel>
        <Panel title="Findings by Category" subtitle="Where your AI needs attention">
          <div className="donut-layout">
            <div className="donut-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    isAnimationActive={false}
                    data={categories}
                    dataKey="value"
                    innerRadius={64}
                    outerRadius={84}
                    paddingAngle={3}
                    stroke="none"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {categories.map((c) => (
                      <Cell key={c.name} fill={c.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center">
                <strong>27</strong>
                <span>Total findings</span>
              </div>
            </div>
            <div className="category-list">
              {categories.map((c, i) => (
                <div key={c.name}>
                  <i className={`category-dot category-${i}`} />
                  <span>{c.name}</span>
                  <strong>{c.value}</strong>
                  <small>{Math.round((c.value / 27) * 100)}%</small>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-footer">
            <span>Across 5 evaluation categories</span>
            <Link to="/findings">
              View findings <ArrowUpRight size={13} />
            </Link>
          </div>
        </Panel>
      </div>
      <Panel
        title="Recent Findings"
        subtitle="The latest issues from your AI assessments"
        action={
          <Button variant="ghost" asChild>
            <Link to="/findings">
              View all findings
              <ArrowRight size={15} />
            </Link>
          </Button>
        }
      >
        <FindingTable compact />
        <div className="table-footer">
          <span>Showing 3 recent findings</span>
          <span>
            Updated today <span className="status-dot" />
          </span>
        </div>
      </Panel>
      <div className="health-section">
        <div className="section-title">
          <h2>Assistant Health</h2>
          <Link to="/assistants">
            Manage assistants <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="health-row">
          <div className="assistant-avatar">
            <Bot size={27} />
          </div>
          <div className="health-name">
            <strong>{state.assistantName}</strong>
            <span>Internal HR knowledge assistant</span>
          </div>
          <Status>Connected (Demo)</Status>
          <div className="health-stat">
            <span>Last assessment</span>
            <strong>{state.runs.length ? "Just now" : "Today"}</strong>
          </div>
          <div className="health-stat health-reliability">
            <span>
              Reliability score <small>Illustrative</small>
            </span>
            <strong>
              94<span>/100</span>
            </strong>
            <MiniBar value={94} />
          </div>
          <div className="health-stat">
            <span>Latest version</span>
            <strong>v1.2</strong>
          </div>
          <Button variant="outline" asChild>
            <Link to="/assistants">
              View Assistant
              <ArrowRight size={15} />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
