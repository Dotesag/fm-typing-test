import Image from "next/image";
import Menu from "./Menu/Menu";

export default function Header() {
  return (
    <header>
      <div className="h-35 w-300 flex items-center justify-between">
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
            Personal best: <span className="text-white">N/A WPM</span>
          </p>
        </div>
      </div>
      <Menu />

      <div className="w-full h-px bg-neutral-700"></div>
    </header>
  );
}
