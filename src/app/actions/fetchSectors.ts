'use server';
import { db } from '@/lib/db';
import { sectors } from '@/lib/db/schema'; 
import { eq, asc, and, SQL } from 'drizzle-orm';
import type { ISector } from '@/lib/db/schema';

export async function fetchSectors<T extends keyof ISector>(
  whereParams: Partial<Record<T, ISector[T]>>
): Promise<ISector[]> {
  const conditions: SQL[] = [];
  
  // Create a type-safe way to map keys to columns
  const columnMap: Partial<Record<keyof ISector, any>> = {
    id: sectors.id,
    uniqId: sectors.uniqId,
    name: sectors.name,
    link: sectors.link,
    placeId: sectors.placeId,
  };
  
  for (const [key, value] of Object.entries(whereParams)) {
    if (value !== undefined && value !== null) {
      const column = columnMap[key as keyof ISector];
      if (column) {
        conditions.push(eq(column, value));
      }
    }
  }
  
  let query = db.select().from(sectors).orderBy(asc(sectors.name));
  
  if (conditions.length > 0) {
    return await query.where(and(...conditions));
  }
  
  const results = await query;
  return results as ISector[];
}


