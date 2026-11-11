import { createFileRoute } from "@tanstack/react-router";
import { Reports } from "@/features/agentlens/reports";
export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reliability Reports | AgentLens" },
      {
        name: "description",
        content: "Review AI assessment scope, simulated remediation, and reliability reports.",
      },
      { property: "og:title", content: "Reliability Reports | AgentLens" },
      {
        property: "og:description",
        content: "Review AI assessment scope, simulated remediation, and reliability reports.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reports,
});
