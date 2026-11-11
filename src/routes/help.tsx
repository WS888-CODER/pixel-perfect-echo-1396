import { createFileRoute } from "@tanstack/react-router";
import { HelpPage } from "@/features/agentlens/settings";
export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Documentation | AgentLens" },
      {
        name: "description",
        content: "Learn AgentLens assessment methodology and simulation boundaries.",
      },
      { property: "og:title", content: "Help & Documentation | AgentLens" },
      {
        property: "og:description",
        content: "Learn AgentLens assessment methodology and simulation boundaries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HelpPage,
});
