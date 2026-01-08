'use server';
import { db } from '@/lib/db';
import { routes } from '@/lib/db/schema'; 
import { eq, asc, and, SQL } from 'drizzle-orm';
import type { IRoute } from '@/lib/db/schema';

export async function fetchRoutes<T extends keyof IRoute>(
  whereParams: Partial<Record<T, IRoute[T]>>
): Promise<IRoute[]> {
  const conditions: SQL[] = [];
  
  // Create a type-safe way to map keys to columns
  const columnMap: Partial<Record<keyof IRoute, any>> = {
    id: routes.id,
    uniqId: routes.uniqId,
    name: routes.name,
    link: routes.link,
    sectorId: routes.sectorId,
  };
  
  for (const [key, value] of Object.entries(whereParams)) {
    if (value !== undefined && value !== null) {
      const column = columnMap[key as keyof IRoute];
      if (column) {
        conditions.push(eq(column, value));
      }
    }
  }
  
  let query = db.select().from(routes).orderBy(asc(routes.name));
  
  if (conditions.length > 0) {
    return await query.where(and(...conditions));
  }
  
  const results = await query;
  return results as IRoute[];
}