import HomeScreen from "screens/HomeScreen";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Comics App" },
    { name: "The Comics App", content: "The Comics App" },
  ];
}

export default function Home() {
  return <HomeScreen />;
}
