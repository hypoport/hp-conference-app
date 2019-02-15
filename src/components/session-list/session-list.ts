import { Component, Input } from '@angular/core';
import { App } from "ionic-angular";
import { Session } from "../../models/session";
import { SessionPage } from "../../pages/session/session";
import { SpeakerService } from '../../providers/speaker/speaker-service';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the AgendaListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'session-list',
  templateUrl: 'session-list.html'
})
export class SessionListComponent {

  sessions: Array<Session> = [];

  @Input()
  set sessionList(sessions: Array<Session>) {
  	this.sessions = sessions;
    this.sessions.forEach((session) => {
      if (session.speakers) {
        let newSpeaker = [];
        session.speakers.forEach((speakerId) => {
          // @ts-ignore
          if(!speakerId.name){
            this.speakerService.getSpeaker(this.globalProvider.conferenceId, speakerId).then((speaker) => {
              // @ts-ignore
              if(speaker) newSpeaker.push(speaker);
            });
          }
        });
        session.speakers = newSpeaker;
      }
    });
  }

  constructor(private app: App, private globalProvider: GlobalProvider, private speakerService: SpeakerService) {

  }

  public goToSessionDetail(session: any) {
    this.app.getRootNav().push(SessionPage, {session: session});
  }

}
