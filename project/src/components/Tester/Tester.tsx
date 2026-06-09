import { useEffect, useState, useContext } from "react";
import { MainContext } from "../Mainpage/Mainpage";
import Image from "next/image";

export default function Tester() {
  const { difficulty, mode, isStarted, setIsStarted } = useContext(MainContext);

  const [phrase, setPhrase] = useState([]);
  const [startTime, setStartTime] = useState(-1);
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
    <section className="relative w-full mt-8 flex flex-col items-center">
      <p
        className={`w-300 text-4xl/snug text-neutral-400 m-4 duration-300 ${phraseCount % 2 ? "opacity-0 absolute pointer-events-none" : ""}`}
      >
        {phrase[0]}
      </p>
      <p
        className={`w-300 text-4xl/snug text-neutral-400 m-4 duration-300 ${phraseCount % 2 ? "" : "opacity-0 absolute pointer-events-none"}`}
      >
        {phrase[1]}
      </p>

      <div
        className={`absolute top-0 h-144 w-full flex flex-col items-center pt-36 backdrop-blur-sm
          text-xl duration-200 ${isStarted ? "opacity-0 pointer-events-none" : "opacity-100"}`}
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
        onClick={() => setIsStarted(false)}
      >
        Restart test
        <Image
          src={"images/icon-restart.svg"}
          alt="restart"
          width={20}
          height={20}
        />
      </button>
    </section>
  );
}
