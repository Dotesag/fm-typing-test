import { useEffect, useState, useContext } from "react";
import { MainContext } from "../../Mainpage/Mainpage";

type WpmProp = {
  text: string;
};

export default function Wpm({ text }: WpmProp) {
  const { difficulty, mode, isStarted, setIsStarted } = useContext(MainContext);

  const [phrase, setPhrase] = useState([]);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (text) {
      setPhrase(text.split(""));
    }
  }, [text]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  const handleKeyPress = (event) => {
    if (!isStarted && event.key === "Enter") {
      setIsStarted(true);
    }
    if (isStarted && event.key === phrase[cursor]) {
      setCursor((prev) => prev + 1);
    }
  };

  return (
    <p className="whitespace-pre-wrap">
      {phrase.map((symbol, ind) => (
        <span
          key={ind}
          className="p-0.2 rounded-md "
          style={{
            background: ind == cursor ? "hsl(0 0% 25%)" : "",
            color: ind < cursor ? "hsl(140 63% 57%)" : ""
          }}
        >
          {symbol}
        </span>
      ))}
    </p>
  );
}
