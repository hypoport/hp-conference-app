import { Injectable } from '@angular/core';
import { Conference } from '../../models/conference';
import { Directions } from '../../models/directions';
import { Location } from '../../models/location';
import { Contact } from '../../models/contact';

@Injectable()
export class ConferenceService {

  constructor() { }

  public getMockedConference(): Conference {
    const conference = new Conference();
    conference.title = "Willkommen";
    conference.description = "Hier folgt eine Beschreibung der Konferenz";
    const directions = new Directions();
    directions.description = "Einfach gerade aus. Siehste schon.";
    directions.address = "Klosterstr. 71, 10771 Berlin";
    directions.location = new Location(52.517927, 13.4121633);
    conference.directions = directions;
    const contact = new Contact();
    contact.name = "Max Mustermann";
    contact.email = "exmaple@mail.de";
    contact.telephone = "030/123456789";
    contact.avatarUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/1200px-Smiley.svg.png";
    conference.contact = contact;
    return conference;
  }

}
