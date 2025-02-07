import { RunView } from "@/components/RunView";
import { runQuery } from "@/db/queries";

export default async function RunPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = await params;
  const run = await runQuery(1);
  return <RunView run={run} />;
}
