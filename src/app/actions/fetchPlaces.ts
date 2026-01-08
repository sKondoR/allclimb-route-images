'use server';
import { db } from '@/lib/db';
import { places } from '@/lib/db/schema'; 
import { eq, asc, and, SQL } from 'drizzle-orm';
import type { IPlace } from '@/lib/db/schema';

export async function fetchPlaces<T extends keyof IPlace>(
  whereParams: Partial<Record<T, IPlace[T]>>
): Promise<IPlace[]> {
  const conditions: SQL[] = [];
  
  // Create a type-safe way to map keys to columns
  const columnMap: Partial<Record<keyof IPlace, any>> = {
    id: places.id,
    uniqId: places.uniqId,
    name: places.name,
    numroutes: places.numroutes,
    link: places.link,
    regionId: places.regionId,
  };
  
  for (const [key, value] of Object.entries(whereParams)) {
    if (value !== undefined && value !== null) {
      const column = columnMap[key as keyof IPlace];
      if (column) {
        conditions.push(eq(column, value));
      }
    }
  }
  
  let query = db.select().from(places).orderBy(asc(places.name));
  
  if (conditions.length > 0) {
    return await query.where(and(...conditions));
  }
  
  const results = await query;
  return results as IPlace[];
}