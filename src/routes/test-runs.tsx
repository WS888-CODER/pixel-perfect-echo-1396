import { createFileRoute } from "@tanstack/react-router";
import { TestRuns } from "@/features/agentlens/testing";
export const Route = createFileRoute("/test-runs")({
  head: () => ({
    meta: [
      { title: "Test Runs | AgentLens" },
      {
        name: "description",
        content: "Execute deterministic AI assistant assessments and review simulated results.",
      },
      { property: "og:title", content: "Test Runs | AgentLens" },
      {
        property: "og:description",
        content: "Execute deterministic AI assistant assessments and review simulated results.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestRuns,
});
