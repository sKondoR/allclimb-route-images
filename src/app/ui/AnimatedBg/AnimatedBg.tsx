'use client'

import useGlobalTime from '@/shared/hooks/useGlobalTime';
import ClientOnly from '@/shared/ui/ClientOnly';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AnimatedBg() {
  const globalTime = useGlobalTime();
  const animationDuration = 15000;
  const delay = (globalTime % animationDuration) / 1000;
  
  return (
    <ClientOnly>
    <div
      className="fixed h-screen inset-0 -z-2 bg-animated-gradient"
      style={{
          animationDelay: `-${delay}s`,
      }}
    ></div>
  </ClientOnly>);
}
