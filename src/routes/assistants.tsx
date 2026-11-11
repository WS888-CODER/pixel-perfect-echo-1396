import { createFileRoute } from "@tanstack/react-router";
import { Assistants } from "@/features/agentlens/assistants";
export const Route = createFileRoute("/assistants")({
  head: () => ({
    meta: [
      { title: "AI Assistants | AgentLens" },
      {
        name: "description",
        content: "Manage simulated HR assistant roles, sources, and configurations.",
      },
      { property: "og:title", content: "AI Assistants | AgentLens" },
      {
        property: "og:description",
        content: "Manage simulated HR assistant roles, sources, and configurations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Assistants,
});
