import Image from "next/image";
import Menu from "./Menu/Menu";

export default function Header() {
  return (
    <header>
      <div className="h-35 w-340 flex items-center justify-between">
        <Image
          src="/images/logo-large.svg"
          alt="logo-large"
          width={280}
          height={1000}
        />
        <div className="flex items-center gap-2">
          <Image
            src="/images/icon-personal-best.svg"
            alt="cup"
            width={20}
            height={20}
          />
          <p className="font-normal text-neutral-500 text-lg">
            Personal best: <span className="text-white">N/A WPM</span>
          </p>
        </div>
      </div>
      <Menu />
    </header>
  );
}
