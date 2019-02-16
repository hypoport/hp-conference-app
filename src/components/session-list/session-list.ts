import { Component, Input } from '@angular/core';
import { App } from "ionic-angular";
import { Session } from "../../models/session";
import { Speaker } from "../../models/speaker";
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
  groupedSessions: Array<Array<Session>> = [];
  speakerById: Array<Speaker> = [];
  doGroup: boolean = true;

  @Input()
  set sessionList(sessions: Array<Session>) {
  	this.sessions = sessions;
    let lastKeyDay = "";
    let index = -1;
    this.sessions.forEach((session) => {
      if (session.speakers) {
        session.speakers.forEach((speakerId) => {
          // @ts-ignore
          this.speakerService.getSpeaker(this.globalProvider.conferenceId, speakerId).then((speaker) => {
              // @ts-ignore
              if(speaker) this.speakerById[speakerId] = speaker;
          });
        });
      }
      let d = new Date(session.timeStart);
      let key = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
      if(key != lastKeyDay){
        index++;
        lastKeyDay = key;
      }
      if(!this.groupedSessions[index]) this.groupedSessions[index] = new Array();
      this.groupedSessions[index].push(session);


    });

  }

  constructor(private app: App, private globalProvider: GlobalProvider, private speakerService: SpeakerService) {

  }

  public goToSessionDetail(session: any) {
    this.app.getRootNav().push(SessionPage, {session: session});
  }

}
