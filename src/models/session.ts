import {Speaker} from "./speaker";
import {SessionCategory} from "./session-category";

export class Session {
  id: string;
  title: string;
  description: string;
  timeStart: Date;
  timeEnd: Date;
  speakers: Array<string>;
  location: string;
  category: Array<SessionCategory>;
  isFavorite: boolean;
}
