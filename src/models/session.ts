import {Speaker} from "./speaker";

export class Session {
  id: string;
  title: string;
  description: string;
  timeStart: Date;
  timeEnd: Date;
  speakers: Array<string>;
  location: string;
  category: string;
  categoryName: string;
  subCategory: string;
  subCategoryName: string;
  isFavorite: boolean;
}
