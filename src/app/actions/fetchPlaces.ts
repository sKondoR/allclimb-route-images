'use server';
import { getDatabase } from '@/lib/database';
import { Place } from '@/models';
import type { IPlace } from '@/shared/types/IPlace';

export async function fetchPlaces(regionId?: string): Promise<IPlace[]> {
  const { getRepository } = await getDatabase();
  const placeRepo = getRepository(Place);
  const where = regionId ? { regionId } : {};
  
  console.log('HERE!');
  const places = await placeRepo.find({
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
  console.log('fetchPlaces: ', places[0]);
  return places;
}

