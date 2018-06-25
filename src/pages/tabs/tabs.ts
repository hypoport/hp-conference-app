import { Component } from '@angular/core';

import { SpeakersPage } from '../speakers/speakers';
import { AgendaPage } from '../agenda/agenda';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  infoPage = HomePage;
  agendaPage = AgendaPage;
  speakerPage = SpeakersPage;

  constructor() {

  }
}
