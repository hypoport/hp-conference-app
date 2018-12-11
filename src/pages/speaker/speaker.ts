import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Speaker } from "../../models/speaker";
import { Session } from "../../models/session";
import { GlobalProvider } from "../../providers/global/global";
import { AgendaService } from "../../providers/agenda/agenda-service";

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
  
  speaker: Speaker;
  speakerSessions: Array<Session> = [];
  
  constructor(public navCtrl: NavController, 
  			public navParams: NavParams,
  			private agendaService: AgendaService,
  			private globalProvider: GlobalProvider) {
    this.speaker = navParams.get('speaker');    
  }
  
  ionViewDidLoad() {
    this.agendaService.getAgenda(this.globalProvider.conferenceId).then((agenda) => {
	  this.speakerSessions = [];
	  console.log(agenda);
      if(agenda.sessions){
	      agenda.sessions.forEach((session,index) => {
		      console.log(session);
		      if(session.speakers){
			      session.speakers.forEach((speakerId,index) => {
			      	if(speakerId == this.speaker.id) this.speakerSessions.push(session);
			      });
		      }
	      });
      }
    });
  }

}
