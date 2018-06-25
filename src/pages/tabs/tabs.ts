import { Component } from '@angular/core';

import { SpeakersPage } from '../speakers/speakers';
import { AgendaPage } from '../agenda/agenda';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { OverviewPage } from '../overview/overview';
import { GlobalProvider } from '../../providers/global/global';
import { ConferenceService } from '../../providers/conference/conference-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  infoPage = HomePage;
  agendaPage = AgendaPage;
  speakerPage = SpeakersPage;

  title: string;

  constructor(private navCtrl: NavController,
              private globalProvider: GlobalProvider,
              private conferenceService: ConferenceService) {
    this.conferenceService.getConference(this.globalProvider.conferenceId).then((conference) => {
      this.title = conference.title;
    });
  }

  public goToOverview() {
    this.navCtrl.push(OverviewPage);
  }
}
