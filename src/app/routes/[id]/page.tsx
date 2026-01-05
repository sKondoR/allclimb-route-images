'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageDescription } from '@/app/ui/PageDescription';
import RouteInfo from '../ui/RouteInfo/RouteInfo';
import type { IRoute } from '@/shared/types/IRoute';
import { fetchRoute } from '@/app/actions/fetchRoute';
import { RouteBadge } from '@/shared/ui/RouteBadge';
import { getBeforeLastSlash } from '@/shared/utils/getBeforeLastSlash';

export default function RoutePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [route, setRoute] = useState<IRoute | null>(null);

  useEffect(() => {
    async function load() {
      const data = await fetchRoute({ id });
      setRoute(data);
    }
    if (id) load();
  }, [id]);

  if (!route) {
    return 'трасса не найденна';
  }
  return (
  <>
    <div className="mt-3">
      <PageDescription>
        {route?.grade ? <RouteBadge grade={route.grade} /> : null}
        <div className="grow ml-3">
          <h2 className="text-3xl text-pink-700">{route.name}</h2>
          <div>{getBeforeLastSlash(route.uniqId)}</div>
        </div>
      </PageDescription>
    </div>
    <RouteInfo />
  </>);
}