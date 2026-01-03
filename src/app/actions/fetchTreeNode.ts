'use server';

import { fetchPlaces } from './fetchPlaces';
import { fetchSectors } from './fetchSectors';
import { fetchRoutes } from './fetchRoutes';

import type { IPlace } from '@/shared/types/IPlace';
import type { ISector } from '@/shared/types/ISector';
import type { IRoute } from '@/shared/types/IRoute';

export async function fetchTreeNode(level: number, parentId?: string): Promise<IPlace[] | ISector[] | IRoute[]> {
  console.log('fetchTreeNode', level);
  const fetchAction = level ===  0 ? fetchPlaces : (level ===  1 ? fetchSectors : fetchRoutes);
  const data = await fetchAction(parentId);
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

