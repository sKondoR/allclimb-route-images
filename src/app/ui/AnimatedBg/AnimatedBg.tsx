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
    <div
      className="fixed h-screen inset-0 -z-2 bg-cover bg-center bg-fixed opacity-30"
      style={{
        backgroundImage: "url('/images/bg5.jpg')",
        
      }}
    ></div>
    <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-20 w-32 h-32 rounded-full bg-white/10 ipulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-24 h-24 rounded-full bg-white/10 ipulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-white/10 ipulse" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-1/4 right-20 w-12 h-12 rounded-full bg-white/10 ipulse" style={{ animationDelay: '8s' }}></div>
    </div>
  </ClientOnly>);
}
