'use client'

import useGlobalTime from '@/shared/hooks/useGlobalTime';
import ClientOnly from '@/shared/ui/ClientOnly';

export default function AnimatedTitle() {
  const globalTime = useGlobalTime();
  const animationDuration = 15000;
  const delay = (globalTime % animationDuration) / 1000;
  
  return (
    <ClientOnly>
      <h1
          className="
              font-mono leading-[0.8]
              w-full
              text-6xl font-bold bg-clip-text text-transparent
              bg-cover bg-center
              bg-animated-gradient
              md:mt-[-93px] md:ml-[-114px]
              relative
          "
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
