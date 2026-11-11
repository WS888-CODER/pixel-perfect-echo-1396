import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  head: () => ({
    meta: [
      { title: "AI Trust Overview | AgentLens" },
      {
        name: "description",
        content:
          "Evaluate, investigate, and improve AI assistant trust with AgentLens’s simulated workspace.",
      },
      { property: "og:title", content: "AI Trust Overview | AgentLens" },
      {
        property: "og:description",
        content:
          "Evaluate, investigate, and improve AI assistant trust with AgentLens’s simulated workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
