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
    <header className="w-full max-w-330 px-5">
      <div className="my-8 w-full flex items-center justify-between">
        <Image
        className="md:block hidden"
          src="/images/logo-large.svg"
          alt="logo-large"
          width={267}
          height={40}
          loading="eager"
          style={{ width: "280px", height: "auto" }}
        />
        <Image
        className="md:hidden block"
          src="/images/logo-small.svg"
          alt="logo-large"
          width={32}
          height={32}
          loading="eager"
          style={{ width: "32px", height: "auto" }}
        />
        <div className="flex items-center gap-2">
          <Image
            src="/images/icon-personal-best.svg"
            alt="cup"
            width={21}
            height={18}
            className="w-[20px] h-auto"
          />
          <p className="font-normal text-neutral-500 text-lg lg:normal-case capitalize">
            <span className="md:inline hidden">Personal</span>best: <span className="text-white ">{Math.round(bestWPM)} WPM</span>
          </p>
        </div>
      </div>
    </header>
  );
}
