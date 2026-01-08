// app/api/routes/route.ts
import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/database';
import { Region } from '../../../models/Region.entity';

export async function POST(request: NextRequest) {
  const params = await request.json();
  const { getRepository } = await getDatabase();
  const regionRepo = getRepository(Region);
  
  const regions = await regionRepo.find(params);
  return Response.json(regions);
}