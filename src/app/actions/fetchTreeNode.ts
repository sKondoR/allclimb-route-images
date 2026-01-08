'use server';

import { fetchPlaces } from './fetchPlaces';
import { fetchSectors } from './fetchSectors';
import { fetchRoutes } from './fetchRoutes';
// import type { IPlace, IRoute, ISector } from '@/lib/db/schema';

const fetchTreeData = async (level: number, parentId: number | undefined) => {
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

export type TreeNode = {
  id: number;
  uniqId: string;
  name: string;
  link: string | null;
  numroutes?: number | null;
  hasChildren: boolean;
};


// Promise<IPlace[] | ISector[] | IRoute[]>
export async function fetchTreeNode(level: number, parentId?: number): Promise<TreeNode[]> {
  const data = await fetchTreeData(level, parentId);
  const preparedData = data.map((el) => ({
    id: el.id,
    uniqId: el.uniqId,
    name: el.name,
    link: el.link,
    numroutes: 'numroutes' in el ? el.numroutes : undefined,
    hasChildren: !!el.link,
  }));
  console.log('fetchTreeNode result: ', preparedData?.[0]);
  return preparedData;
}

