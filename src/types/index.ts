export type Allegiance = 'G.I. Joe' | 'Cobra' | 'Iron Grenadiers' | 'Oktober Guard' | 'Dreadnok' | 'Cobra-La' | string;
export type CollectionStatus = 'Not Owned' | 'Owned' | 'Wanted';
export type SaleStatus = 'Not for Sale' | 'For Sale';
export type Condition = 'Mint' | 'Good' | 'Normal Wear' | 'Below Average' | 'Beater';
export type JointCondition = 'Tight' | 'Normal' | 'Slightly Loose' | 'Very Loose';
export type ScrewCondition = 'Good' | 'Rusty' | 'Striped';
export type PackageType = 'Carded' | 'Packaged with Vehicle' | 'Packaged with Playset';

export interface FigureData {
  "Code Name": string;
  "Real Name": string;
  "Series": string;
  "Allegiance": string;
  "Sub Team": string | number;
  "Version": string | number;
  "USA Year": number;
  "Associated Vehicle": string | number;
  "Filecard Character Information": string;
  "Has Swivel Arm"?: boolean;
  "photoUrl"?: string;
}