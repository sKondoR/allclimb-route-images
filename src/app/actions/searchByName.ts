import { getDatabase } from '@/lib/database';
import { Place, Route, Sector } from '@/models';

export async function searchByName(query: string) {
  if (!query || query.trim() === '') {
    return [];
  }

  const { getRepository } = await getDatabase();

  const searchTerm = `%${query.trim()}%`;

  const placeRepo = getRepository(Place);
  const sectorRepo = getRepository(Sector);
  const routeRepo = getRepository(Route);

  try {
    const [places, sectors, routes] = await Promise.all([
      placeRepo.createQueryBuilder('place')
        .select(['place.id', 'place.name'])
        .where('LOWER(place.name) LIKE LOWER(:searchTerm)', { searchTerm })
        .getMany(),

      sectorRepo.createQueryBuilder('sector')
        .select(['sector.id', 'sector.name'])
        .where('LOWER(sector.name) LIKE LOWER(:searchTerm)', { searchTerm })
        .getMany(),

      routeRepo.createQueryBuilder('route')
        .select(['route.id', 'route.name'])  // 'route.link
        .where('LOWER(route.name) LIKE LOWER(:searchTerm)', { searchTerm })
        .getMany(),
    ]);

    console.log('search: ');
    console.log({
      places,
      sectors,
      routes,
    });

    return {
      places: places.map(({ id, name }: { id: string, name: string }) => ({ id, name })),
      sectors: sectors.map(({ id, name }: { id: string, name: string }) => ({ id, name })),
      routes: routes.map(({ id, name }: { id: string, name: string }) => ({ id, name })),
    };
  } catch (error) {
    console.error('Ошибка поиска по имени: ', error);
    throw new Error('Ошибка поиска по имени');
  }
}