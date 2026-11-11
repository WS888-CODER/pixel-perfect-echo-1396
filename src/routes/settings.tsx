import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/features/agentlens/settings";
export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | AgentLens" },
      { name: "description", content: "Manage AgentLens demo workspace preferences." },
      { property: "og:title", content: "Settings | AgentLens" },
      { property: "og:description", content: "Manage AgentLens demo workspace preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});
