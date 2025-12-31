import { Region } from '@/models/Region';
import type { IRegion } from '@/shared/types/IRegion';
import { getDatabase } from '@/lib/database';

export const getAllRegions = async (): Promise<IRegion[]> => {
    const { getMongoRepository } = await getDatabase();
    const repo = getMongoRepository(Region);
    const regions = await repo.find();
    return regions;
};