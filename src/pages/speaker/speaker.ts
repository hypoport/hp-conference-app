import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Speaker } from "../../models/speaker";
import { Session } from "../../models/session";
import { GlobalProvider } from "../../providers/global/global";
import { AgendaService } from "../../providers/agenda/agenda-service";
import { BrowserService } from '../../providers/browser-service/browser-service';

/**
 * Generated class for the SpeakerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-speaker',
  templateUrl: 'speaker.html',
})
export class SpeakerPage {

  @ViewChild('desc') desc: ElementRef;

  speaker: Speaker;
  speakerSessions: Array<Session> = [];

  constructor(public navCtrl: NavController,
  			public navParams: NavParams,
  			private agendaService: AgendaService,
  			private globalProvider: GlobalProvider,
        private browserService: BrowserService,
      ) {
    this.speaker = navParams.get('speaker');
  }

  ionViewDidLoad() {
    this.agendaService.getAgenda(this.globalProvider.conferenceId).then((agenda) => {
	  this.speakerSessions = [];
      if(agenda.sessions){
	      agenda.sessions.forEach((session,index) => {
		      console.log(session);
		      if(session.speakers){
			      session.speakers.forEach((speakerId,index) => {
			      	if(speakerId == this.speaker.id) this.speakerSessions.push(session);
			      });
		      }
          /*
          if(this.globalProvider.conferenceId && this.speaker.id){
            this.ga.trackView('conf/ep/'+this.globalProvider.conferenceId+'/speaker/'+this.speaker.id);
          } else {
            this.ga.trackView('speakerPage');
          }*/
	      });
      }
    });
    this.browserService.enableDynamicHyperlinks(this.desc);
  }

  ionViewDidEnter(){

  }

}
