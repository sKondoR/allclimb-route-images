import AnimatedTitleColored from "./AnimatedTitleColored";

export default function AnimatedTitle() {
  return (
      <h1
        className={`
          font-mono font-bold text-white leading-[0.8]
          bg-cover bg-center
          text-transparent
          text-3xl md:text-6xl
          absolute z-10

          left-[-28px] top-[-2px]

          md:left-[-89px] md:top-[-24px]
        `}
      >
        <AnimatedTitleColored />
        Поиск<br />Allclimb<br />трасс
      </h1>
  );
}
