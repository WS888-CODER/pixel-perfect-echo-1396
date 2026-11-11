import { createFileRoute } from "@tanstack/react-router";
import { Overview } from "@/features/agentlens/overview";
export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Overview | AgentLens" },
      {
        name: "description",
        content: "Monitor fictional AI assistant security, quality, and reliability.",
      },
      { property: "og:title", content: "Overview | AgentLens" },
      {
        property: "og:description",
        content: "Monitor fictional AI assistant security, quality, and reliability.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Overview,
});
