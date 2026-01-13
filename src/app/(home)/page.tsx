
import { SearchForm } from './ui/SearchForm';
import { SEARCH_TABS } from '@/shared/constants/allclimb.constants';
import { RoutesTree } from './ui/RoutesTree';
import { PageDescription } from '../ui/PageDescription';
import { Suspense } from 'react';
import { RegionsService } from '@/lib/services/regions.service';

let regionsPromise: Promise<any> | null = null;

export default async function Home(
  { searchParams }: { searchParams: { search?: string } }
) {

  if (!regionsPromise) {
    regionsPromise = RegionsService.find();
  }

  const regions = await regionsPromise;
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
