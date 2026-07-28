"use client";
import Header from "../Header/Header";
import { createContext, useState } from "react";
import Tester from "../Tester/Tester";

export const MainContext = createContext(null);

export default function Mainpage() {
  const difficultyButtons = [
    { name: "Easy", key: "easy" },
    { name: "Medium", key: "medium" },
    { name: "Hard", key: "hard" },
  ];
  const modeButtons = [
    { name: "Timed (60s)", key: "timed" },
    { name: "Passage", key: "passage" },
  ];

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>(
    difficultyButtons[0].key,
  );
  const [mode, setMode] = useState<string>(modeButtons[0].key);
  const [WPM, setWPM] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  return (
    <MainContext.Provider
      value={{
        isStarted,
        setIsStarted,
        difficultyButtons,
        difficulty,
        setDifficulty,
        modeButtons,
        mode,
        setMode,
        WPM,
        setWPM,
        accuracy,
        setAccuracy,
        time,
        setTime,
      }}
    >
      <div className="flex flex-col items-center">
        <Header />
        <Tester />
      </div>
    </MainContext.Provider>
  );
}
