import { FigureData } from '../../types';
import { figures1982 } from './1982';
import { figures1983 } from './1983';

// Combine all figure data and ensure all fields are properly typed
export const historicalFigures: FigureData[] = [
  ...figures1982,
  ...figures1983,
].map(figure => ({
  "Code Name": String(figure["Code Name"] || ''),
  "Real Name": String(figure["Real Name"] || ''),
  "Series": String(figure["Series"] || ''),
  "Allegiance": String(figure["Allegiance"] || ''),
  "Sub Team": String(figure["Sub Team"] || ''),
  "Version": String(figure["Version"] || '1'),
  "USA Year": Number(figure["USA Year"]) || new Date().getFullYear(),
  "Associated Vehicle": String(figure["Associated Vehicle"] || ''),
  "Filecard Character Information": String(figure["Filecard Character Information"] || ''),
  "Has Swivel Arm": Boolean(figure["Has Swivel Arm"]),
  "photoUrl": String(figure["photoUrl"] || '')
}));