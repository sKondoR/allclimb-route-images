import type { Metadata } from "next";
import AnimatedTitleTop from "./ui/AnimatedTitle/AnimatedTitleTop";

export const metadata: Metadata = {
  title: "Поиск по имени трассы на Allclimb",
  description: "Поиск по имени трассы на Allclimb",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-auto sm:w-full md:w-1/2 relative">
      <AnimatedTitleTop />
      <div className="bg-white/60 backdrop-blur-lg rounded-sm shadow-2xl transition-all duration-300 hover:shadow-3xl relative z-2">
        <div className="border-white/30 rounded-sm py-4 px-6 hover:border-white/50 transition-colors overflow-hidden ">
          {children}
        </div>
      </div>
    </div> 
  );
}
