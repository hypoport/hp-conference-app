import {Directions} from "./directions";
import {Contact} from "./contact";
import {QuickAccessCard} from "./quickaccess-card";
import {ConferenceOptions} from "./conference-options";

export class Conference {
  id: string;
  token: string;
  title: string;
  subtitle: string;
  quickaccess: Array<QuickAccessCard>;
  startDate: Date;
  endDate: Date;
  city: string;
  header: string;
  description: string;
  directions: Directions;
  contact: Contact;
  image: string;
  headerImage: string;
  walletImage: string;
  brand: string;
  options: ConferenceOptions;
}
