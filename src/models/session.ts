import {Speaker} from "./speaker";

export class Session {
  id: string;
  title: string;
  description: string;
  timeStart: Date;
  timeEnd: Date;
  speakers: Array<string|Speaker>;
  location: string;
  category: string;
  isFavorite: boolean;
}
