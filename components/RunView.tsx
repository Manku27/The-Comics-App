import List from "./List";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { sampleRunList } from "../models/mockData";
import type { IRun } from "models/books";

interface RunViewProps {
  run: IRun;
}

export const RunView = ({ run }: RunViewProps) => {
  const [selectedEditionIndex, setSelectedEditionIndex] = useState(0);

  return (
    <div className="container mx-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-6 flex items-baseline gap-4 text-gray-100">
              {run.name}
              <span className="text-2xl text-gray-400">({run.year})</span>
            </h1>

            <h2 className="text-lg font-medium text-gray-300 mb-3">
              Available in editions:
            </h2>
            <div className="inline-flex gap-2 p-1 bg-gray-800 rounded-xl">
              {run.editions.map((edition, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedEditionIndex(index)}
                  className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                    selectedEditionIndex === index
                      ? "bg-gray-700 text-blue-400 shadow-sm"
                      : "text-gray-300 hover:text-gray-100"
                  }`}
                >
                  {edition.type}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <List
                key={selectedEditionIndex}
                items={run.editions[selectedEditionIndex].list}
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4">
            <h2 className="text-lg font-bold mb-3 text-gray-300">
              {sampleRunList.name} Series
            </h2>
            <div className="space-y-1.5">
              {sampleRunList.list
                .sort((a, b) => a.id - b.id)
                .map((runItem) => (
                  <div
                    key={runItem.id}
                    className="px-3 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    <p className="text-sm text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
                      #{runItem.collects} • {runItem.name} ({runItem.year}) -{" "}
                      {runItem.period}
                    </p>
                  </div>
                ))}
            </div>
            <div className="space-y-1.5 mt-5">
              <div className="px-3 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors cursor-pointer">
                <p className="text-sm text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
                  Miniseries
                </p>
              </div>
              <div className="px-3 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors cursor-pointer">
                <p className="text-sm text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
                  One-shots
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4">
            <h3 className="text-md font-bold text-gray-300 mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-200">{run.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
