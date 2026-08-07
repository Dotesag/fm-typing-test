import { useEffect, useState, useContext, useRef } from "react";
import Image from "next/image";
import { MainContext } from "../../Mainpage/Mainpage";

export default function Result() {
  const { setIsStarted, setIsEnded, isEnded } = useContext(MainContext);

  return (
    <div
      className={`absolute top-0 h-full w-full flex flex-col items-center pt-10 bg-neutral-900
            text-xl duration-200 ${isEnded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <Image
        src="/images/icon-completed.svg"
        alt="icon-completed"
        width={64}
        height={64}
        loading="eager"
      />

      <div className="flex flex-col gap-4 my-10 items-center ">
        <p className="text-4xl font-semibold">Baseline established!</p>
        <p className="text-neutral-400">
          Youʼve set the bar. Now the real challenge begins—time to beat it.
        </p>
      </div>

      <div className="flex gap-5 mb-10">
        <div className="result-box">
          <p>WPM:</p>
        </div>
        <div className="result-box">
          <p>Accuracy:</p>
        </div>
        <div className="result-box">
          <p>Characters</p>
        </div>
      </div>

      <button
        className="bg-white text-neutral-900 p-4 rounded-xl flex items-center gap-2 font-semibold"
        onClick={() => {
          setIsStarted(false);
          setIsEnded(false);
        }}
      >
        <p>Beat this score </p>
        <svg
          className="w-5 h-5 text-neutral-900"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.563 1.281h.949c.246 0 .422.211.422.457l-.07 3.446a8.6 8.6 0 0 1 7.277-3.868c4.816 0 8.718 3.938 8.718 8.72-.035 4.816-3.937 8.683-8.718 8.683a8.86 8.86 0 0 1-5.871-2.215.446.446 0 0 1 0-.633l.703-.703c.14-.14.386-.14.562 0 1.23 1.09 2.813 1.723 4.606 1.723A6.88 6.88 0 0 0 17.03 10c0-3.797-3.093-6.89-6.89-6.89-2.813 0-5.203 1.687-6.293 4.078l4.43-.106c.245 0 .456.176.456.422v.95c0 .245-.21.421-.421.421h-6.75a.406.406 0 0 1-.422-.422v-6.75c0-.21.175-.422.422-.422" />
        </svg>
      </button>
    </div>
  );
}
