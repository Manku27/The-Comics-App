import { NavLink } from "react-router";
import { comicRuns } from "../models/mockData";

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      {/* Bat Symbol */}
      <img
        src="/images/bat.png"
        alt="Batman Logo"
        className="w-48 h-24 object-contain my-8 drop-shadow-[0_0_50px_rgba(255,215,0,0.9)] filter brightness-200"
      />

      {/* Title */}
      <h1 className="text-5xl uppercase tracking-wider mb-8 text-center text-yellow-500 font-gothic drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
        Gotham Needs You
      </h1>

      {/* Comics List */}
      <div className="max-w-3xl w-full bg-black/70 p-8 rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.2)]">
        {comicRuns.map((run) => (
          <NavLink
            key={run.rank}
            to={`/run/${run.rank}`}
            className="flex items-center p-4 border-b border-yellow-500/20 text-white no-underline transition-all duration-300 hover:bg-yellow-500/10 hover:translate-x-2 last:border-b-0"
          >
            <span className="text-2xl font-bold text-yellow-500 mr-6 min-w-[2rem]">
              {run.rank}
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-bold mb-1">{run.title}</span>
              <span className="text-sm text-gray-400">{run.creators}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
