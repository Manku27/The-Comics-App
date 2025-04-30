import { fetchContent } from "@/config/contentful";
import { prepareRunList } from "@/models/runs";
import HomeScreen from "@/screens/HomeScreen";

async function getComicRunsForHome() {
  const runs = await fetchContent({
    content_type: "run",
  });
  return prepareRunList(runs);
}

export default async function Home() {
  const runs = await getComicRunsForHome();
  return <HomeScreen comicRuns={runs} />;
}
