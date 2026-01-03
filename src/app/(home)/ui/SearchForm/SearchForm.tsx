'use client';
import { useState, useEffect, useRef } from 'react';
import useDebounce from '@/shared/hooks/useDebounce';
import {
  TEDropdown,
  TEDropdownItem,
} from 'tw-elements-react';

// Update the result types to reflect objects with id and name
type SearchResult = {
  places: { id: string; name: string }[];
  sectors: { id: string; name: string }[];
  routes: { id: string; name: string }[];
};

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState<SearchResult>({
    places: [],
    sectors: [],
    routes: [],
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLFormElement>(null);

  const fetchResults = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data || { places: [], sectors: [], routes: [] });
      setIsOpen(true);
    } catch (error) {
      setResults({ places: [], sectors: [], routes: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      fetchResults(debouncedQuery);
    } else {
      setResults({ places: [], sectors: [], routes: [] });
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debouncedQuery) {
      setIsOpen(false);
    }
  };

  const hasResults =
    (results.places?.length > 0) || (results.sectors?.length > 0) || (results.routes?.length > 0);

console.log('hasResults: ', hasResults, results, results.places && results.places.length > 0);
  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative" ref={dropdownRef}>
      <div>
        <label htmlFor="search" className="sr-only">
          Search query
        </label>
        <input
          id="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
        {loading && <p className="text-sm text-gray-500 mt-1">Searching...</p>}

        {/* Dropdown Results */}

        <TEDropdown isOpen={isOpen && hasResults}>
          {/* Places */}
          {results.places.length > 0 && (
            <div className="p-2">
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Places
              </h3>
              <ul className="space-y-1">
                {results.places.map((place) => (
                  <li key={`place-${place.id}`}>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded"
                      onClick={() => {
                        setQuery(place.name);
                        setIsOpen(false);
                      }}
                    >
                      {place.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sectors */}
          {results.sectors.length > 0 && (
            <div className="p-2 border-t border-gray-100">
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Sectors
              </h3>
              <ul className="space-y-1">
                {results.sectors.map((sector) => (
                  <li key={`sector-${sector.id}`}>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded"
                      onClick={() => {
                        setQuery(sector.name);
                        setIsOpen(false);
                      }}
                    >
                      {sector.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Routes */}
          {results.routes.length > 0 && (
            <div className="p-2 border-t border-gray-100">
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Routes
              </h3>
              <ul className="space-y-1">
                {results.routes.map((route) => (
                  <li key={`route-${route.id}`}>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded"
                      onClick={() => {
                        setQuery(route.name);
                        setIsOpen(false);
                      }}
                    >
                      {route.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </TEDropdown>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        поиск
      </button>
    </form>
  );
}
