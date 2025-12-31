import { getAllRegions } from '@/services/regionService';
import type { IRegion } from '@/shared/types/IRegion';
import { fetchRegions } from '@/actions/fetchRegions';

export default async function RegionList() {
  const regions: IRegion[] = await getAllRegions(); 

  if (!regions?.length) {
    await fetchRegions();
  }  
  
  return (
    <div className="p-8">
      <h1 className="font-bold mb-2">Regions</h1>
      <ul className="">
        {regions.map((region: IRegion) => (
          <li key={region._id.toString()} className="inline-block mr-2 ml-0">
            {region.name}
          </li>
        ))}
      </ul>
    </div>
  );
}