'use server';
import { getDatabase } from '@/lib/database';
import { Sector } from '@/models';
import type { ISector } from '@/shared/types/ISector';

export async function fetchSectors(placeId?: string): Promise<ISector[]> {
  const { getRepository } = await getDatabase();
  const sectorRepo = getRepository(Sector);
  const where = placeId ? { placeId } : {};
  
  console.log('fetchSectors: ', placeId);
  const sectors = await sectorRepo.find({
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
  const test = sectors.map((s) => s.placeId);
  console.log('test: ', test);
  console.log('fetchSectors result: ', sectors[0]);
  return sectors;
}

