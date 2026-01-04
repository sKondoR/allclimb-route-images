'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { TabGroup, Tab, TabList } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderTree, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SEARCH_TABS } from '@/shared/constants/allclimb';

export default function SearchTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('search');

  const handleTabClick = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('search', value);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  // Optional: Sync external changes to tab
  useEffect(() => {
    if (!searchParams.get('search')) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('search', SEARCH_TABS[0]);
      router.replace(`${pathname}?${newParams.toString()}`);
    }
  }, [searchParams, pathname, router]);

  const isQuerySearch = tab === SEARCH_TABS[0];
  return (
    <div className="border-b border-black/40 text-xl">
      <TabGroup>
        <TabList className="flex">
          <Tab
            onClick={() => handleTabClick(SEARCH_TABS[0])}
            key="по названию"
            className={`
              inline-block py-3 px-5 cursor-pointer select-none text-center border-b hover:border-orange-700 hover:text-orange-700 focus-visible:outline-none
              ${isQuerySearch
                ? ' text-blue-700 border-blue-700'
                : ' text-gray-800 border-transparent'
              }
              `
            }
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} /> по названию
          </Tab>
          <Tab
            onClick={() => handleTabClick(SEARCH_TABS[1])}
            key="по региону"
            className={`
              inline-block py-3 px-5 cursor-pointer select-none text-center border-b hover:border-orange-700 hover:text-orange-700 focus-visible:outline-none
              ${!isQuerySearch 
                ? ' text-blue-700 border-blue-700'
                : ' text-gray-800 border-transparent'
              }
              `
            }
          >
            <FontAwesomeIcon icon={faFolderTree} /> по региону
          </Tab>
        </TabList>
      </TabGroup>
    </div>
  );
}