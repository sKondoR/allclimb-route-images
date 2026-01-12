'use client';

import { scrapRoutes } from '@/app/actions/scrapRoutes';

export default function ScrapButton() {
  const handleScrap= async (e: React.FormEvent) => {
    e.preventDefault();
    scrapRoutes();
  };

  return (
    <button
        type="button"
        className="rounded-md px-7 py-2 text-white transition-colors hover:bg-cyan-800/80 focus:outline-none cursor-pointer mb-3 border-2 border-white"
        onClick={handleScrap}
        // disabled
    >
        обновить данные с Allclimb
    </button>
  );
}
