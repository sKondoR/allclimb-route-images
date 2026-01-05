'use server';

import { getDatabase } from '@/lib/database';
import { Settings } from '@/models/Settings';
import type { IScrapStats } from '@/shared/types/ISettings';

export async function updateScrapStats(stats: IScrapStats) {
  const { getRepository } = await getDatabase();
  const settingsRepo = getRepository(Settings);
  let settings = await settingsRepo.findOne({
    where: {}
  });
  if (!settings) {
    settings = new Settings();
  }
  settings.scrapStats = stats; // Replace with actual data
  await settingsRepo.save(settings);
}

