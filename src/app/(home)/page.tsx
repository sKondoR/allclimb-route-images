
import { SearchForm } from './ui/SearchForm';
import { SEARCH_TABS } from '@/shared/constants/allclimb';
import { RoutesTree } from './ui/RoutesTree';
import { fetchRegions } from '../actions/fetchRegions';
import type { IRegion } from '@/shared/types/IRegion';

export default async function Home(
  { searchParams }: { searchParams: { search?: string } }
) {
  const regions: IRegion[] = await fetchRegions(); 
  const { search } = await searchParams;
  const isFirstTab = !search || search === SEARCH_TABS[0];
  return (
    <>
      <div className="mt-3">
        {isFirstTab ?  <SearchForm /> : <RoutesTree regions={regions} />}
      </div>
    </> 
  );
}
