'use client'

import { useEffect, useState } from 'react';
import ScrapButton from '../ScrapButtton/ScrapButton';
import RecursiveTree from './Tree';
import type { IRegion } from '@/shared/types/IRegion';

export default function TreeTest() {
  const [regions, setRegions] = useState<IRegion[]>([]);

  useEffect(() => {
    if (regions.length) return;
    const load = async function () {
      const res = await fetch('/api/regions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: {
            country: 'ASC',
            name: 'ASC',
          },
        }),
      });
      const data = await res.json();
      console.log('data', data);
      setRegions(data);
    }
    load();
  }, [regions.length]);

  if (!regions?.length) {
    return;
  }

  const initialTreeData = regions.map((region) => ({
    id: region.id,
    name: region.name,
    link: region.link,
    country: region.country,
    hasChildren: !!region.link,
  }));

  console.log('initialTreeData', initialTreeData);

  return (
    <>
      <div className="mb-5">
        <ScrapButton />
      </div>
      <RecursiveTree
        initialData={initialTreeData}
      />
    </>
  );
}