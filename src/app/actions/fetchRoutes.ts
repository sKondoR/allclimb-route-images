'use server';
import { getDatabase } from '@/lib/database';
import { Route } from '@/models';
import type { IRoute } from '@/shared/types/IRoute';

export async function fetchRoutes(sectorId?: string): Promise<IRoute[]> {
  const { getRepository } = await getDatabase();
  const routeRepo = getRepository(Route);
  const where = sectorId ? { sectorId } : {};
  
  const routes = await routeRepo.find({
    // relations: {
    //   children: {
    //     children: true, 
    //   },
    // },
    where,
    order: {
      name: 'ASC',
    },
  });
  console.log('fetchRoutes: ', routes[0]);
  return routes;
}

