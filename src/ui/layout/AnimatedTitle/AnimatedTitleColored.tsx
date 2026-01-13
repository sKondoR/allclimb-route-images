'use client'

import useGlobalTime from '@/shared/hooks/useGlobalTime';
import { ClientOnly } from '@/shared/ui/ClientOnly';

export default function AnimatedTitleColored({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalTime = useGlobalTime();
  const animationDuration = 15000;
  const delay = (globalTime % animationDuration) / 1000;
  
  return (
    <ClientOnly
      className="absolute overflow-hidden select-none 

        left-[0] top-[38px]
        width-full height-[calc(100% - 38px)]

        md:left-[89px] md:top-[77px]
        md:width-[calc(100% - 89px)] md:height-[calc(100% - 77px)]
      "
      style={{ height: '77px' }}
    >
      <h1
          className={`
            block
              font-mono font-bold leading-[0.8] 
              bg-clip-text text-transparent              
              font-bold bg-clip-text text-transparent
              bg-cover bg-center bg-animated-gradient
              text-3xl md:text-6xl

              ml-[0] mt-[-38px]

              md:ml-[-89px] md:mt-[-77px]
          `}
          style={{
            animationDelay: `-${delay}s`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            paddingBottom: '7px',
          }}
          suppressHydrationWarning
      >
          {children}
      </h1>
    </ClientOnly>
  );
}
