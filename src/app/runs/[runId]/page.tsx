import { RunView } from "@/components/RunView";
import { fetchContent } from "@/config/contentful";
import { preparedRun } from "@/models/runs";

async function getRunBySlug(slug: any) {
  const run = await fetchContent({
    content_type: "run",
    "fields.slug": slug,
    include: 3,
  });
  return preparedRun(run?.[0]);
}

export default async function RunPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = await params;
  const run = await getRunBySlug(runId);

  return <RunView run={run} />;
}
