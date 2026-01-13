import Link from "next/link";
import AnimatedTitleColored from "./AnimatedTitleColored";

export default function AnimatedTitle({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Link
        href="/"
        className={`
          font-mono font-bold text-white leading-[0.8]
          bg-cover bg-center
          text-transparent select-none
          text-3xl md:text-6xl
          absolute z-10

          left-[10px] top-[-2px]

          md:left-[-89px] md:top-[-24px]
        `}
      >
        <AnimatedTitleColored>
          {children}
        </AnimatedTitleColored>
        {children}
      </Link>
  );
}
