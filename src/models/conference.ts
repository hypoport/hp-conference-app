import {Directions} from "./directions";
import {Contact} from "./contact";

export class Conference {
  id: string;
  title: string;
  header: string;
  description: string; // HTMlElement?
  directions: Directions;
  contact: Contact;
  image: string;
}
