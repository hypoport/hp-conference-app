import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {SpeakersPage} from '../speakers/speakers';
import {AgendaPage} from '../agenda/agenda';
import {HomePage} from '../home/home';
import {ExhibitorsPage} from '../exhibitors/exhibitors';
import {HomePopoverPage} from '../home-popover/home-popover';
import {AgendaPopoverPage} from '../agenda-popover/agenda-popover';

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
  exhibitorsPage = ExhibitorsPage;

  title: string;

  constructor(private globalProvider: GlobalProvider, private conferenceService: ConferenceService, public popoverCtrl: PopoverController, public navParams: NavParams) {
    this.title = this.conferenceService.getConference(this.globalProvider.conferenceId).title;
  }

  openPopover(event){
	const popover = this.popoverCtrl.create(HomePopoverPage);
	popover.present({
      ev: event
    });
   }

  openPopoverAgenda(event){
 	const popover = this.popoverCtrl.create(AgendaPopoverPage);
 	popover.present({
       ev: event
     });
  }

  tabsChange(ev){
	if(ev.index == 1){
		this.title = this.globalProvider.getLabel("navAgenda");
	} else if(ev.index == 2){
		this.title = this.globalProvider.getLabel("navSpeaker");;
	} else if(ev.index == 3){
		this.title = this.globalProvider.getLabel("navExhibitor");;
	} else {
    	this.title = this.conferenceService.getConference(this.globalProvider.conferenceId).title;
	}
  }
}
