
import { SearchForm } from './ui/SearchForm';
import { SEARCH_TABS } from '@/shared/constants/allclimb';
import { RoutesTree } from './ui/RoutesTree';
import { fetchRegions } from '../actions/fetchRegions';
import type { IRegion } from '@/shared/types/IRegion';
import { PageDescription } from '../ui/PageDescription';
import { Suspense } from 'react';

async function HomeContent (
  { searchParams }: { searchParams: { search?: string } }
) {
  const regions: IRegion[] = await fetchRegions(); 
  const { search } = await searchParams;
  const isFirstTab = !search || search === SEARCH_TABS[0];
  return (
    <>
      <Suspense fallback={<div></div>}>
        <div className="mt-3">
          <PageDescription>
            <div className="w-full text-right">поиск трасс, секторов и регионов с Allclimb</div>
          </PageDescription>
          {isFirstTab ?  <SearchForm /> : <RoutesTree regions={regions} />}
        </div>
      </Suspense>
    </> 
  );
}

export default function Home(
  { searchParams }: { searchParams: { search?: string } }
) {
  return (
    <Suspense fallback={<div></div>}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
}
