import { Component, Input } from '@angular/core';
import { App } from "ionic-angular";
import { Session } from "../../models/session";
import { Speaker } from "../../models/speaker";
import { SessionPage } from "../../pages/session/session";
import { SpeakerService } from '../../providers/speaker/speaker-service';
import { FavoritesService } from '../../providers/favorites/favorites-service';
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
    this.groupedSessions = new Array();
    this.groupedParallelSessions = new Array();

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
        parallelIndex = -1;
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
  }

  constructor(private app: App, private globalProvider: GlobalProvider, private speakerService: SpeakerService, private favoritesService: FavoritesService) {

  }

  public toggleFavorite(event: Event, session: Session) {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(this.globalProvider.conferenceId, session);
  }

  public goToSessionDetail(session: any) {
    this.app.getRootNav().push(SessionPage, {session: session});
  }

  iconHotFix(cat){
    if(cat == "ws_a"){
      return 'swap';
    } else if(cat == "ws_b"){
      return 'settings';
    } else if(cat == "ws_c"){
      return 'cloud';
    } else if(cat == "break"){
      return 'cafe';
    } else if(cat == "transit"){
      return 'bus';
    } else if(cat == "party"){
      return 'wine';
    } else {
      return 'easel';
    }
  }

}
