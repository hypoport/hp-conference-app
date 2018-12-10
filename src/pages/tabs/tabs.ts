import {Component} from '@angular/core';

import {SpeakersPage} from '../speakers/speakers';
import {AgendaPage} from '../agenda/agenda';
import {HomePage} from '../home/home';
import {GlobalProvider} from '../../providers/global/global';
import {ConferenceService} from '../../providers/conference/conference-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  infoPage = HomePage;
  agendaPage = AgendaPage;
  speakerPage = SpeakersPage;

  title: string;

  constructor(private globalProvider: GlobalProvider, private conferenceService: ConferenceService) {
    this.title = this.conferenceService.getConference(this.globalProvider.conferenceId).title
  }
}
