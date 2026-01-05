'use server';

import { fetchPlaces } from './fetchPlaces';
import { fetchSectors } from './fetchSectors';
import { fetchRoutes } from './fetchRoutes';

import type { IPlace } from '@/shared/types/IPlace';
import type { ISector } from '@/shared/types/ISector';
import type { IRoute } from '@/shared/types/IRoute';

const fetchTreeData = async (level: number, parentId: string) => {
  switch (level) {
    case 0:
      return await fetchPlaces({ regionId: parentId });
    case 1:
      return await fetchSectors({ placeId: parentId });
    case 2:
      return await fetchRoutes({ sectorId: parentId });
    default:
      throw new Error(`Unsupported level: ${level}`);
  }
};


export async function fetchTreeNode(level: number, parentId?: string): Promise<IPlace[] | ISector[] | IRoute[]> {
  const data = await fetchTreeData(level, parentId || '');
  const preparedData = data.map((el) => ({
    id: el.id,
    name: el.name,
    link: el.link,
    numroutes: 'numroutes' in el ? el.numroutes : undefined,
    hasChildren: !!el.link,
  }));
  console.log('fetchTreeNode result: ', preparedData?.[0]);
  return preparedData;
}

