export interface IScrapStats {
    regions: number;
    regionsErrors: number;
    places: number;
    placesErrors: number;
    sectors: number;
    sectorsErrors: number;
    routes: number;
    scrapDate: string;
    scrapDuration?: string;
}