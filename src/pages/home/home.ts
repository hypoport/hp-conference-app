import { Component } from '@angular/core';
import { Conference } from '../../models/conference';
import { ConferenceService } from '../../providers/conference/conference-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  conference: Conference;

  constructor(conferenceService: ConferenceService) {
    this.conference = conferenceService.getMockedConference();
  }

}
