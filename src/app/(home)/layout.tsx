import type { Metadata } from "next";

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
    <div className="m-auto sm:w-full md:w-1/2 bg-white/60 backdrop-blur-lg rounded-sm shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
      <div className="image-upload-container border-2 border-white/30 rounded-sm p-6 hover:border-white/50 transition-colors">
        {children}
      </div>
    </div> 
  );
}
