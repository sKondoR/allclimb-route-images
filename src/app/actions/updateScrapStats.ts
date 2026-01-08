'use server';

import { getDatabase } from '@/lib/database';
import { Settings } from '../../lib/models/Settings';
import type { IScrapStats } from '@/shared/types/IScrapStats';

export async function updateScrapStats(stats: IScrapStats) {
  const { getRepository } = await getDatabase();
  const settingsRepo = getRepository(Settings);
  let settings = await settingsRepo.findOne({
    where: {}
  });
  if (!settings) {
    settings = new Settings();
  }
  const maxRoutes = stats.routes > settings.scrapStats.routes ? stats.routes : settings.scrapStats.routes;
  settings.scrapStats = { 
    ...stats,
    routes: maxRoutes,
    routesErrors: maxRoutes - stats.routes,
  };
  await settingsRepo.save(settings);
}

