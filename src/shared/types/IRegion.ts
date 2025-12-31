export interface IRegion {
    _id: string;
    name: string;
    country: string;
    season: string;
    link: string;
    updatedAt: Date;
}

export type IRegionNode = IRegion & {
  children?: IRegionNode[];
  isOpen?: boolean;
};