
import { SearchForm } from './ui/SearchForm';
import { SEARCH_TABS } from '@/shared/constants/allclimb';
import { RoutesTree } from './ui/RoutesTree';
import { PageDescription } from '../ui/PageDescription';
import { Suspense } from 'react';

export default async function Home(
  { searchParams }: { searchParams: { search?: string } }
) {
  const { search } = await searchParams;
  const isFirstTab = !search || search === SEARCH_TABS[0];
  return (
    <>
      <Suspense fallback={<div></div>}>
        <div className="mt-3">
          <PageDescription>
            <div className="w-full text-right">поиск трасс, секторов и регионов с Allclimb</div>
          </PageDescription>
          {isFirstTab ?  <SearchForm /> : <RoutesTree />}
        </div>
      </Suspense>
    </> 
  );
}
