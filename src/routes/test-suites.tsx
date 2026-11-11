import { createFileRoute } from "@tanstack/react-router";
import { TestSuites } from "@/features/agentlens/testing";
export const Route = createFileRoute("/test-suites")({
  head: () => ({
    meta: [
      { title: "Test Suites | AgentLens" },
      {
        name: "description",
        content: "Create and manage simulated AI security and quality test scenarios.",
      },
      { property: "og:title", content: "Test Suites | AgentLens" },
      {
        property: "og:description",
        content: "Create and manage simulated AI security and quality test scenarios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestSuites,
});
