'use client'

import useGlobalTime from '@/shared/hooks/useGlobalTime';
import ClientOnly from '@/shared/ui/ClientOnly';

export default function AnimatedTitleColored() {
  const globalTime = useGlobalTime();
  const animationDuration = 15000;
  const delay = (globalTime % animationDuration) / 1000;
  
  return (
    <ClientOnly  // hidden md:block
      className="absolute overflow-hidden 

        left-[28px] top-[38px]
        width-[calc(100% - 28px)] height-[calc(100% - 38px)]

        md:left-[89px] md:top-[77px]
        md:width-[calc(100% - 89px)] md:height-[calc(100% - 77px)]
      "
    >
      <h1
          className={`
            block
              font-mono font-bold leading-[0.8]
              bg-clip-text text-transparent              
              font-bold bg-clip-text text-transparent
              bg-cover bg-center bg-animated-gradient
              text-3xl md:text-6xl
              24px

              ml-[-28px] mt-[-38px]

              md:ml-[-89px] md:mt-[-77px]
          `}
          style={{
            animationDelay: `-${delay}s`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text'
          }}
          suppressHydrationWarning
      >
          Поиск<br />Allclimb<br />трасс
      </h1>
    </ClientOnly>
  );
}
