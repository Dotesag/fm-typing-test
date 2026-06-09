import { useState, useContext } from "react";

import { MainContext } from "@/components/Mainpage/Mainpage";

export default function Menu() {
  const {
    difficultyButtons,
    difficulty,
    setDifficulty,
    modeButtons,
    mode,
    setMode,
    isStarted,
  } = useContext(MainContext);

  return (
    <div className="flex justify-between items-center mb-3">
      <div className="text-neutral-500 text-lg flex gap-5 items-center">
        <p>
          WPM: <span className="text-white font-bold">N/A</span>
        </p>

        <div className="w-px h-6 bg-neutral-700"></div>

        <p>
          Accuracy: <span className="text-white font-bold">N/A</span>
        </p>

        <div className="w-px h-6 bg-neutral-700"></div>

        <p>
          Time: <span className="text-white font-bold">N/A</span>
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center">
          <p className="text-neutral-500">Difficulty:</p>
          <div className="flex gap-2">
            {difficultyButtons.map((elem, index) => (
              <button
                key={index}
                onClick={() => setDifficulty(elem.key)}
                className="border disabled:cursor-not-allowed rounded-lg px-3 py-1 duration-200 cursor-pointer text-white border-neutral-400 hover:text-blue-400 hover:border-blue-400"
                style={{
                  borderColor:
                    elem.key === difficulty ? "hsl(210, 100%, 65%)" : "",
                  color: elem.key === difficulty ? "hsl(210, 100%, 65%)" : "",
                }}
                disabled={isStarted}
              >
                {elem.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-8 bg-neutral-700"></div>

        <div className="flex gap-4 items-center">
          <p className="text-neutral-500">Mode:</p>
          <div className="flex gap-2">
            {modeButtons.map((elem, index) => (
              <button
                key={index}
                onClick={() => setMode(elem.key)}
                className="border disabled:cursor-not-allowed rounded-lg px-3 py-1 duration-200 cursor-pointer text-white border-neutral-400 hover:text-blue-400 hover:border-blue-400"
                style={{
                  borderColor: elem.key === mode ? "hsl(210, 100%, 65%)" : "",
                  color: elem.key === mode ? "hsl(210, 100%, 65%)" : "",
                }}
                disabled={isStarted}
              >
                {elem.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
