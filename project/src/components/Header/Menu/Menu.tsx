import { useState } from "react";

export default function Menu() {
  const difficultyButtons = ["Easy", "Medium", "Hard"];
  const modeButtons = ["Timed (60s)", "Passage"];

  const [difficulty, setDifficulty] = useState<string>(difficultyButtons[0]);
  const [mode, setMode] = useState<string>(modeButtons[0]);

  return (
    <div className="flex justify-between items-center">
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
                onClick={() => setDifficulty(elem)}
                className="border rounded-lg px-3 py-1 duration-200 cursor-pointer"
                style={{
                  borderColor:
                    elem === difficulty
                      ? "hsl(210, 100%, 65%)"
                      : "hsl(240, 3%, 46%)",
                  color: elem === difficulty ? "hsl(210, 100%, 65%)" : "white",
                }}
              >
                {elem}
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
                onClick={() => setMode(elem)}
                className="border rounded-lg px-3 py-1 duration-200 cursor-pointer"
                style={{
                  borderColor:
                    elem === mode ? "hsl(210, 100%, 65%)" : "hsl(240, 3%, 46%)",
                  color: elem === mode ? "hsl(210, 100%, 65%)" : "white",
                }}
              >
                {elem}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
