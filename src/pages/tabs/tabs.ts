import {Component} from '@angular/core';

import {SpeakersPage} from '../speakers/speakers';
import {AgendaPage} from '../agenda/agenda';
import {HomePage} from '../home/home';
import {HomePopoverPage} from '../home-popover/home-popover';

import {GlobalProvider} from '../../providers/global/global';
import {ConferenceService} from '../../providers/conference/conference-service';
import {PopoverController} from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  infoPage = HomePage;
  agendaPage = AgendaPage;
  speakerPage = SpeakersPage;

  title: string;

  constructor(private globalProvider: GlobalProvider, private conferenceService: ConferenceService, public popoverCtrl: PopoverController) {
    this.title = this.conferenceService.getConference(this.globalProvider.conferenceId).title
  }
  
  openPopover(event){
	const popover = this.popoverCtrl.create(HomePopoverPage);
	popover.present({
      ev: event
    });
   }
  
}
