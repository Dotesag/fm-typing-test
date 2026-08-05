import { useEffect, useState, useContext, useRef } from "react";
import Image from "next/image";
import { MainContext } from "../../Mainpage/Mainpage";

export default function Result() {
  const { setIsStarted, setIsEnded, isEnded } = useContext(MainContext);

  return (
    <div
      className={`absolute top-0 h-full w-full flex flex-col items-center pt-36 bg-neutral-900
            text-xl duration-200 ${isEnded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <Image
        src="/images/icon-completed.svg"
        alt="icon-completed"
        width={64}
        height={64}
        loading="eager"
      />
      <p>Baseline established!</p>
      <button
        onClick={() => {
          setIsStarted(false);
          setIsEnded(false);
        }}
      >
        Beat this score{" "}
      </button>
    </div>
  );
}
