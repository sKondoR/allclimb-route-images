import { getBeforeLastSlash } from '@/shared/utils/getBeforeLastSlash';
import type { FoundResults } from './SearchResults.types';

export default function SearchResults({ results }: { results: FoundResults }) {
  const hasResults =
    (results.places?.length > 0) || (results.sectors?.length > 0) || (results.routes?.length > 0);

  if (!hasResults) return null;
  return (
    <div className="flex mt-5 gap-10">
      <div className="w-1/2">
        {results.routes.length > 0 && (
          <div className="">
            <h3 className="text-lg text-pink-700 uppercase tracking-wider border-b-2 border-pink-700 mb-3">
              Трассы
            </h3>
            <ul className="space-y-2">
              {results.routes.map((route) => (
                <li key={`route-${route.id}`}>
                    <a href={`/routes/${route.id}`} className="cursor-pointer text-cyan-700 hover:text-pink-700">{route.name}</a>
                    <div className="text-xs text-gray-500">{getBeforeLastSlash(route.uniqId)}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="w-1/2">
        {results.places.length > 0 && (
          <div className="">
            <h3 className="text-lg text-pink-700 uppercase tracking-wider border-b-2 border-pink-700 mb-3">
              Места в регионах
            </h3>
            <ul className="space-y-1">
              {results.places.map((place) => (
                <li key={`place-${place.id}`}>
                    {place.name}
                    <div className="text-xs text-gray-500">{getBeforeLastSlash(place.uniqId)}</div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {results.sectors.length > 0 && (
          <div className="mt-5">
            <h3 className="text-lg text-pink-700 uppercase tracking-wider border-b-2 border-pink-700 mb-3">
              Сектора
            </h3>
            <ul className="space-y-1">
              {results.sectors.map((sector) => (
                <li key={`sector-${sector.id}`}>
                    {sector.name}
                    <div className="text-xs text-gray-500">{getBeforeLastSlash(sector.uniqId)}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
