import { db } from '@/lib/db';
import { settings, type ISettings } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';

export class SettingsService {
  static async find(): Promise<ISettings[]> {    
    return await db
      .select()
      .from(settings)
      .orderBy(asc(settings.id));
  }
}