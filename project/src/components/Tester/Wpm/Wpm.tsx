import { useEffect, useState, useContext, useRef } from "react";
import { MainContext } from "../../Mainpage/Mainpage";
import CryptoJS from "crypto-js";

type WpmProp = {
  text: string;
  isActive: boolean;
};

export default function Wpm({ text, isActive }: WpmProp) {
  const {
    difficulty,
    mode,
    isEnded,
    setIsEnded,
    isStarted,
    setIsStarted,
    setWPM,
    WPM,
    setAccuracy,
    accuracy,
    cursor,
    setCursor,
    errors,
    setErrors,
    setTime,
    time,
    setBestWPM,
  } = useContext(MainContext);

  const [phrase, setPhrase] = useState([]);
  const cursorRef = useRef(0);
  const errorsRef = useRef([]);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  const wordsRef = useRef<number>(0);

  useEffect(() => {
    if (text) {
      setPhrase(text.split(""));
    }
  }, [text]);

  useEffect(() => {
    if (isActive) {
      document.addEventListener("keydown", handleKeyPress);
      return () => document.removeEventListener("keydown", handleKeyPress);
    }
  });

  useEffect(() => {
    if (!isStarted && !isEnded) {
      setCursor(0);
      setErrors([]);
      cursorRef.current = 0;
      errorsRef.current = [];
      setAccuracy(100);
      clearInterval(timerRef.current);
      setTime(0);
      wordsRef.current = 0;
    }

    if (isStarted && !isEnded && isActive) {
      startTimeRef.current = performance.now();
      timerRef.current = setInterval(() => {
        setTime(performance.now() - startTimeRef.current);
        setWPM(
          wordsRef.current /
            ((performance.now() - startTimeRef.current) / 1000 / 60),
        );
      }, 1);
    }
  }, [isStarted, isEnded]);

  const handleKeyPress = (event) => {
    if (isActive) {
      if (isStarted && !isEnded && event.key) {
        if (event.key === "Backspace") {
          if (cursorRef.current > 0) {
            errorsRef.current = errorsRef.current.filter(
              (a) => a != cursorRef.current - 1,
            );
            cursorRef.current -= 1;
          }
        } else {
          if (event.key.length == 1) {
            if (
              (event.key == " " && phrase[cursorRef.current] == " ") ||
              phrase.length == cursorRef.current + 1
            ) {
              wordsRef.current += 1;
            }
            if (event.key != phrase[cursorRef.current]) {
              errorsRef.current = [...errorsRef.current, cursorRef.current];
            }
            cursorRef.current += 1;
            if (cursorRef.current >= phrase.length) {
              const finalWPM =
                wordsRef.current /
                ((performance.now() - startTimeRef.current) / 1000 / 60);
              setWPM(finalWPM);
              setIsStarted(false);
              setIsEnded(true);
              clearInterval(timerRef.current);
              try {
                const decryptedStorage = CryptoJS.AES.decrypt(
                  localStorage.getItem("personal best"),
                  "SuperSecretKey",
                );
                const prevBest =
                  Number(decryptedStorage.toString(CryptoJS.enc.Utf8)) || 0;
                if (finalWPM > prevBest) {
                  setBestWPM(finalWPM);
                  const encrypted = CryptoJS.AES.encrypt(
                    String(finalWPM),
                    "SuperSecretKey",
                  ).toString();
                  localStorage.setItem("personal best", encrypted);
                }
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
        if (errorsRef.current && cursorRef.current > 0) {
          setAccuracy((1 - errorsRef.current.length / cursorRef.current) * 100);
        }
        setCursor(cursorRef.current);
        setErrors(errorsRef.current);
      }
      if (!isStarted && !isEnded && event.key === "Enter") {
        event.preventDefault();
        setIsStarted(true);
      }
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
            color:
              ind < cursor
                ? errors.includes(ind)
                  ? "hsl(354 63% 57%)"
                  : "hsl(140 63% 57%)"
                : "",
            textDecorationLine: errors.includes(ind) ? "underline" : "none",
          }}
        >
          {symbol}
        </span>
      ))}
    </p>
  );
}
