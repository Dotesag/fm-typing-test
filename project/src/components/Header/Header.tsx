import Image from "next/image";
import { useContext, useEffect } from "react";
import { MainContext } from "@/components/Mainpage/Mainpage";
import CryptoJS from "crypto-js";

export default function Header() {
  const { bestWPM, setBestWPM } = useContext(MainContext);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("personal best");
      if (!stored) return;
      const decryptedStorage = CryptoJS.AES.decrypt(stored, "SuperSecretKey");
      const newBestWPM = Number(decryptedStorage.toString(CryptoJS.enc.Utf8));
      console.log(newBestWPM);
      setBestWPM(newBestWPM);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <header className="w-full">
      <div className="my-8 w-full flex items-center justify-between">
        <Image
          src="/images/logo-large.svg"
          alt="logo-large"
          width={267}
          height={40}
          loading="eager"
          style={{ width: "280px", height: "auto" }}
        />
        <div className="flex items-center gap-2">
          <Image
            src="/images/icon-personal-best.svg"
            alt="cup"
            width={21}
            height={18}
            className="w-[20px] h-auto"
          />
          <p className="font-normal text-neutral-500 text-lg">
            Personal best: <span className="text-white">{Math.round(bestWPM)} WPM</span>
          </p>
        </div>
      </div>
    </header>
  );
}
