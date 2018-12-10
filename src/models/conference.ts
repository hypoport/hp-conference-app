import {Directions} from "./directions";
import {Contact} from "./contact";

export class Conference {
  id: string;
  token: string;
  title: string;
  subtitle: string;
  startDate: Date;
  endDate: Date;
  city: string;
  header: string;
  description: string;
  directions: Directions;
  contact: Contact;
  image: string;
  brand: string;
}
