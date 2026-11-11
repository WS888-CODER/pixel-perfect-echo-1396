import { createFileRoute } from "@tanstack/react-router";
import { Findings } from "@/features/agentlens/findings";
export const Route = createFileRoute("/findings")({
  head: () => ({
    meta: [
      { title: "Security Findings | AgentLens" },
      {
        name: "description",
        content: "Investigate fictional AI security findings and supporting evidence.",
      },
      { property: "og:title", content: "Security Findings | AgentLens" },
      {
        property: "og:description",
        content: "Investigate fictional AI security findings and supporting evidence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Findings,
});
