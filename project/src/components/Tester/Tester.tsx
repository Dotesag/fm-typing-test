import { useEffect, useState, useContext } from "react";
import { MainContext } from "../Mainpage/Mainpage";
import Image from "next/image";
import Wpm from "./Wpm/Wpm";
import Menu from "./Menu/Menu";
import Result from "./Result/Result";

export default function Tester() {
  const { difficulty, mode, isStarted, setIsStarted, isEnded, setIsEnded } =
    useContext(MainContext);

  const [phrase, setPhrase] = useState<string | any>([]);
  const [phraseCount, setPhraseCount] = useState(0);

  useEffect(() => {
    if (!isStarted) {
      fetch("api/getdata")
        .then((res) => res.json())
        .then((newData) => {
          const phrases = newData[difficulty];
          const randomPhrase1 =
            phrases[Math.floor(Math.random() * phrases.length)].text;
          if (!phrase.length) {
            const randomPhrase2 =
              phrases[Math.floor(Math.random() * phrases.length)].text;
            setPhrase([randomPhrase1, randomPhrase2]);
          } else {
            setPhrase((prev) => {
              const newArr = [...prev];
              newArr[(phraseCount + 1) % 2] = randomPhrase1;
              return newArr;
            });
            setPhraseCount((prev) => prev + 1);
          }
        });
    }
  }, [mode, difficulty, isStarted]);

  return (
    <section className="relative w-full sm:mt-8 flex flex-col items-center max-w-330 sm:px-5 ">
      <div className="relative w-full flex flex-col items-center">
        <Menu />
        <div className="relative w-full mt-7 flex flex-col items-center">
          <div className="grid justify-items-center overflow-hidden max-h-[55vh]">
            <div
              className={`text-4xl/snug text-neutral-400 m-4 duration-300 col-start-1 row-start-1 ${phraseCount % 2 ? "opacity-0 pointer-events-none" : ""}`}
            >
              {<Wpm text={phrase[0]} isActive={phraseCount % 2 === 0} />}
            </div>
            <div
              className={`text-4xl/snug text-neutral-400 m-4 duration-300 col-start-1 row-start-1 ${phraseCount % 2 ? "" : "opacity-0 pointer-events-none"}`}
            >
              {<Wpm text={phrase[1]} isActive={phraseCount % 2 === 1} />}
            </div>
          </div>
          <div
            className={`absolute top-0 h-full w-full flex flex-col items-center pt-36 backdrop-blur-sm
              text-xl ${!isStarted ? "" : "duration-300"} ${!isStarted && !isEnded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <button
              className="bg-blue-600 rounded-xl p-3 mb-4 cursor-pointer"
              onClick={() => setIsStarted(true)}
            >
              Start typing test
            </button>
            <p>Or click the text and start typing</p>
          </div>
          <button
            className={`bg-neutral-800 rounded-xl p-3.5 cursor-pointer flex gap-3 text-xl duration-200 ${isStarted ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{}}
            onClick={() => {
              setIsStarted(false);
              setIsEnded(false);
            }}
          >
            Restart test
            <Image
              src={"images/icon-restart.svg"}
              alt="restart"
              width={20}
              height={20}
            />
          </button>
        </div>
        <Result />
      </div>
    </section>
  );
}
