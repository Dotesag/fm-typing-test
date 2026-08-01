import { useEffect, useState, useContext, useRef } from "react";
import { MainContext } from "../../Mainpage/Mainpage";

export default function Result() {
  const { setIsStarted, setIsEnded } = useContext(MainContext);

  return (
    <div
      className={`absolute top-0 h-full w-full flex flex-col items-center pt-36 bg-neutral-900
            text-xl duration-200`}
    >
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
