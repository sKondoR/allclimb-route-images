import { db } from '@/lib/db';
import { settings, type IScrapStats, type ISettings } from '@/lib/db/schema';
import { asc, eq } from 'drizzle-orm';

export class SettingsService {
  static async find(): Promise<ISettings[]> {    
    return await db
      .select()
      .from(settings)
      .orderBy(asc(settings.id));
  }

  static async updateScrapStats(stats: IScrapStats): Promise<void> {    
    const result = await db.select().from(settings).limit(1).execute();
    const currentSettings = result[0];

    const currentMaxRoutes = currentSettings?.scrapStats?.routes || 0;
    const newSuccessfulRoutes = stats.routes;
    const maxRoutes = Math.max(currentMaxRoutes, newSuccessfulRoutes);
    const routesErrors = maxRoutes - newSuccessfulRoutes;

    const newScrapStats: IScrapStats = {
      ...stats,
      routes: maxRoutes,
      routesErrors,
    };

    if (!currentSettings) {
      await db.insert(settings).values({
        scrapStats: newScrapStats,
      }).execute();
    } else {
      await db.update(settings)
        .set({ scrapStats: newScrapStats })
        .where(eq(settings.id, currentSettings.id))
        .execute();
    }
  }
}
