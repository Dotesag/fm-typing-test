import { useState, useContext, useEffect } from "react";
import Image from "next/image";

import { MainContext } from "@/components/Mainpage/Mainpage";
import { timeEnd } from "node:console";

export default function Menu() {
  const {
    difficultyButtons,
    difficulty,
    setDifficulty,
    modeButtons,
    mode,
    setMode,
    isStarted,
    WPM,
    accuracy,
    time,
    isEnded,
  } = useContext(MainContext);

  const [showingTime, setShowingTime] = useState(time);

  const [isModeSelectorActive, setIsModeSelectorActive] = useState(false);
  const [isDifficultySelectorActive, setIsDifficultySelectorActive] =
    useState(false);

  useEffect(() => {
    if (mode === "timed") {
      setShowingTime(60 * 1000 - time);
    } else {
      setShowingTime(time);
    }
  }, [time]);

  return (
    <div
      className={`w-full ${!isEnded ? "" : "duration-300 invisible pointer-events-none"}`}
    >
      <div className="flex justify-between items-center mb-3 flex-col lg:flex-row">
        <div className="text-neutral-500 text-lg lg:flex gap-3 items-center flex lg:pb-0 pb-4">
          <p className="w-20 text-nowrap text-center">
            WPM: <br className="lg:hidden" />
            <span className="text-white font-bold w-2">{Math.round(WPM)}</span>
          </p>

          <div className="w-px lg:h-6 h-12 bg-neutral-700"></div>

          <p className="w-37 text-nowrap text-center">
            Accuracy: <br className="lg:hidden" />
            <span className="text-white font-bold w-2">
              {Math.round(accuracy)}%
            </span>
          </p>

          <div className="w-px lg:h-6 h-12 bg-neutral-700"></div>

          <p className=" text-center">
            Time: <br className="lg:hidden" />
            <span className="text-white font-bold">
              {String(Math.floor(showingTime / 1000 / 60)).padStart(2, "0")}:
              {String(Math.floor((showingTime / 1000) % 60)).padStart(2, "0")}
            </span>
          </p>
        </div>

        <div className="gap-3 items-center md:flex hidden">
          <div className="flex gap-3   items-center">
            <p className="text-neutral-500">Difficulty:</p>
            <div className="flex gap-2">
              {difficultyButtons.map((elem, index) => (
                <button
                  key={index}
                  onClick={() => setDifficulty(elem.key)}
                  className="border disabled:cursor-not-allowed rounded-lg px-2.5 py-1 duration-200 cursor-pointer text-white border-neutral-400 hover:text-blue-400 hover:border-blue-400"
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
          <div className="flex gap-3 items-center">
            <p className="text-neutral-500">Mode:</p>
            <div className="flex gap-2">
              {modeButtons.map((elem, index) => (
                <button
                  key={index}
                  onClick={() => setMode(elem.key)}
                  className="border disabled:cursor-not-allowed rounded-lg px-2.5 py-1 duration-200 cursor-pointer text-white border-neutral-400 hover:text-blue-400 hover:border-blue-400"
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

        <div className="flex gap-3">
          <div className="md:hidden flex">
            <div>
              <button
                onClick={() => setIsDifficultySelectorActive((prev) => !prev)}
                className="border disabled:cursor-not-allowed rounded-lg w-44 py-1 duration-200 cursor-pointer text-white border-neutral-400 hover:text-blue-400 hover:border-blue-400 flex justify-center items-center gap-2"
              >
                {difficultyButtons.find((obj) => obj.key === difficulty).name}{" "}
                <Image
                  src="/images/icon-down-arrow.svg"
                  alt="down"
                  width={11}
                  height={6}
                ></Image>
              </button>
              <ul
                className={`ease-in-out grid ${isDifficultySelectorActive ? "grid-rows-[1fr] leading-6" : "grid-rows-[0fr] pointer-events-none leading-0"} transition-[grid-template-rows] absolute z-50 duration-250 bg-neutral-800 w-44 mt-1.5 rounded-lg`}
              >
                <div className="min-h-0 overflow-hidden">
                  {difficultyButtons.map((elem, index) => (
                    <div key={index}>
                      <label
                        className={` ${isDifficultySelectorActive ? "py-2 opacity-100" : "py-0 opacity-0"} duration-250 flex gap-2 px-2 items-center`}
                      >
                        <input
                          type="radio"
                          name={elem.key}
                          checked={difficulty === elem.key}
                          onChange={() => setDifficulty(elem.key)}
                          className={`${isDifficultySelectorActive ? "" : "scale-0 "} appearance-none w-4 h-4 rounded-full border border-white checked:border-blue-400 checked:border-5 duration-250 origin-center`}
                        ></input>
                        <p>{elem.name}</p>
                      </label>
                      {index != difficultyButtons.length - 1 && (
                        <div className="h-px w-full bg-neutral-700"></div>
                      )}
                    </div>
                  ))}
                </div>
              </ul>
            </div>
          </div>

          <div className="md:hidden flex">
            <div>
              <button
                onClick={() => setIsModeSelectorActive((prev) => !prev)}
                className="border disabled:cursor-not-allowed rounded-lg w-44 py-1 duration-200 cursor-pointer text-white border-neutral-400 hover:text-blue-400 hover:border-blue-400 flex justify-center items-center gap-2"
              >
                {modeButtons.find((obj) => obj.key === mode).name}{" "}
                <Image
                  src="/images/icon-down-arrow.svg"
                  alt="down"
                  width={11}
                  height={6}
                ></Image>
              </button>
              <ul
                className={`ease-in-out grid ${isModeSelectorActive ? "grid-rows-[1fr] leading-6" : "grid-rows-[0fr] pointer-events-none leading-0"} transition-[grid-template-rows] absolute z-50 duration-250 bg-neutral-800 w-44 mt-1.5 rounded-lg`}
              >
                <div className="min-h-0 overflow-hidden">
                  {modeButtons.map((elem, index) => (
                    <div key={index}>
                      <label
                        className={` ${isModeSelectorActive ? "py-2 opacity-100" : "py-0 opacity-0"} duration-250 flex gap-2 px-2 items-center`}
                      >
                        <input
                          type="radio"
                          name={elem.key}
                          checked={mode === elem.key}
                          onChange={() => setMode(elem.key)}
                          className={`${isModeSelectorActive ? "" : "scale-0 "} appearance-none w-4 h-4 rounded-full border border-white checked:border-blue-400 checked:border-5 duration-250 origin-center`}
                        ></input>
                        <p>{elem.name}</p>
                      </label>
                      {index != modeButtons.length - 1 && (
                        <div className="h-px w-full bg-neutral-700"></div>
                      )}
                    </div>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-neutral-700"></div>
    </div>
  );
}
