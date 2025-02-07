import { comicRuns } from "@/models/mockData";
import HomeScreen from "@/screens/HomeScreen";

async function getComicRunsForHome() {
  return comicRuns;
}

export default async function Home() {
  const comicRuns = await getComicRunsForHome();

  return <HomeScreen comicRuns={comicRuns} />;
}
