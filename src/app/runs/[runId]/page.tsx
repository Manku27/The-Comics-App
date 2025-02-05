import { RunView } from "@/components/RunView";
import { sampleRun } from "@/models/mockData";

export default function RunPage() {
  return <RunView run={sampleRun} />;
}
