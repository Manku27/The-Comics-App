import { RunView } from "components/RunView";
import { sampleRun } from "models/mockData";
import type { Route } from "./+types/sampleRunView";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sample Run View" },
    { name: "Sample Run View 1", content: "Sample Run View Nightwing" },
  ];
}

export default function SampleRunView() {
  return <RunView run={sampleRun} />;
}
