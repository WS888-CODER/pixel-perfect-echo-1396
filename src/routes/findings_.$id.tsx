import { createFileRoute } from "@tanstack/react-router";
import { FindingDetail } from "@/features/agentlens/findings";
import { findings } from "@/features/agentlens/demo";
export const Route = createFileRoute("/findings_/$id")({
  head: ({ params }) => {
    const title = `${findings.find((f) => f.id === params.id)?.title ?? "Finding unavailable"} | AgentLens`;
    const description =
      "Investigate simulated evidence, source lineage, and recommended remediation.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: FindingPage,
});
function FindingPage() {
  const { id } = Route.useParams();
  return <FindingDetail id={id} />;
}
