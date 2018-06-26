export class AgendaItem {
  id: string;
  title: string;
  description: string;
  timeStart: Date;
  timeEnd: Date;
  speakers: Array<string>;
  location: string;
  category: Array<string>;
}
