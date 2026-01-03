import ScrapButton from '../ScrapButtton/ScrapButton';
import RecursiveTree from './Tree';
import type { IRegion } from '@/shared/types/IRegion';

export default async function TreeTest({ regions }: { regions: IRegion[] }) {
  const initialTreeData = regions.map((region) => ({
    id: region.id,
    name: region.name,
    link: region.link,
    country: region.country,
    hasChildren: !!region.link,
  }));

  return (
    <>
      <div className="mb-5">
        <ScrapButton />
      </div>
      <RecursiveTree
        initialData={initialTreeData}
      />
    </>
  );
}