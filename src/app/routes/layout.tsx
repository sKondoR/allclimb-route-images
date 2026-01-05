import type { Metadata } from "next";
import { Climber } from "../ui/Climber";
import AnimatedTitle from "../(home)/ui/AnimatedTitle/AnimatedTitle";
import { HeaderPanel } from "@/shared/ui/HeaderPanel";

export const metadata: Metadata = {
  title: "Трасса Allclimb",
  description: "Трасса Allclimb",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-auto sm:w-full md:w-3/4 max-w-4xl relative">
      <AnimatedTitle>Отметь<br />Allclimb<br />трассу</AnimatedTitle>
      <HeaderPanel />
      <Climber />
      <div className="bg-white/60 backdrop-blur-md rounded-sm shadow-2xl transition-all duration-300 hover:shadow-3xl relative z-2">
        <div className="border-white/30 rounded-sm py-4 px-3 md:px-6 md:py-6 hover:border-white/50 transition-colors overflow-hidden">
          {children}
        </div>
      </div>
    </div> 
  );
}
