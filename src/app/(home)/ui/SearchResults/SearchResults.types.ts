export type FoundPlace = { id: string; name: string; uniqId: string; link: string };
export type FoundSector = { id: string; name: string; uniqId: string; link: string };
export type FoundRoute = { id: string; name: string; uniqId: string; sectorLink: string };

export type FoundResults = {
  places: FoundPlace[];
  sectors: FoundSector[];
  routes: FoundRoute[];
};