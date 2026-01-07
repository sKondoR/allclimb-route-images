import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/database';
import { Settings } from '../../../models/Settings';

export async function GET(request: NextRequest) {
  const { getRepository } = await getDatabase();
  const settingsRepo = getRepository(Settings);
  
  const settings = await settingsRepo.find({
    where: {},
  });
  console.log('settings> ', settings);
  return Response.json(settings);
}
