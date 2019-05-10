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
  speakerById: Array<Speaker> = [];

  doGroup: boolean = true;
  groupedSessions: Array<Array<Session>> = [];
  groupedParallelSessions: Array<Array<Array<Session>>> = [];

  @Input() layout: string;
  @Input()
  set sessionList(sessions: Array<Session>) {
  	this.sessions = sessions;

    // group by days
    let lastKeyDay = "";
    let dayIndex = -1;

    // group by parallel sessions
    let lastParallelKey = "";
    let parallelIndex = -1;

    this.sessions.forEach((session) => {

      // build a list with speakers
      if (session.speakers) {
        session.speakers.forEach((speakerId) => {
          // @ts-ignore
          this.speakerService.getSpeaker(this.globalProvider.conferenceId, speakerId).then((speaker) => {
              // @ts-ignore
              if(speaker) this.speakerById[speakerId] = speaker;
          });
        });
      }

      // group session by days
      let d = new Date(session.timeStart);
      let key = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
      if(key != lastKeyDay){
        dayIndex++;
        lastKeyDay = key;
      }
      if(!this.groupedSessions[dayIndex]) this.groupedSessions[dayIndex] = new Array();
      this.groupedSessions[dayIndex].push(session);

      // group parallel sessions
      let keyTime = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate()+' '+d.getHours()+':'+d.getMinutes();
      if(keyTime != lastParallelKey){
        parallelIndex++;
        lastParallelKey = keyTime;
      }
      if(!this.groupedParallelSessions[dayIndex]) this.groupedParallelSessions[dayIndex] = new Array();
      if(!this.groupedParallelSessions[dayIndex][parallelIndex]) this.groupedParallelSessions[dayIndex][parallelIndex] = new Array();
      this.groupedParallelSessions[dayIndex][parallelIndex].push(session);

    });
    console.log('test');
    console.log(this.groupedParallelSessions);

  }

  constructor(private app: App, private globalProvider: GlobalProvider, private speakerService: SpeakerService) {

  }

  public goToSessionDetail(session: any) {
    this.app.getRootNav().push(SessionPage, {session: session});
  }

}
