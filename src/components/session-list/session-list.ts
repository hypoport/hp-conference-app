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

  currentSessionArr: Array<boolean> = []; // improvement: extend Session Model with isCurrent property
  timeOutArr: Array<number> = []; // saves all setTimeouts created by this component

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


  convertToBorderColor(hex: string){
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var saturate = 1.02;

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var rgb = result ? {
      r: Math.min(Math.round(parseInt(result[1], 16)*saturate),255),
      g: Math.min(Math.round(parseInt(result[2], 16)*saturate),255),
      b: Math.min(Math.round(parseInt(result[3], 16)*saturate),255)
    } : null;

    var lighten = 0.45;
    var r = Math.round((1 - (1 - rgb.r / 255) * (1 - (255*lighten) / 255)) * 255);
    var g = Math.round((1 - (1 - rgb.g / 255) * (1 - (255*lighten) / 255)) * 255);
    var b = Math.round((1 - (1 - rgb.b / 255) * (1 - (255*lighten) / 255)) * 255);

    return 'rgba('+r+','+g+','+b+',1)'
  }

  convertToBgColor(hex: string){
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var saturate = 1.07;

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var rgb = result ? {
      r: Math.min(Math.round(parseInt(result[1], 16)*saturate),255),
      g: Math.min(Math.round(parseInt(result[2], 16)*saturate),255),
      b: Math.min(Math.round(parseInt(result[3], 16)*saturate),255)
    } : null;

    var lighten = 0.85;
    var r = Math.round((1 - (1 - rgb.r / 255) * (1 - (255*lighten) / 255)) * 255);
    var g = Math.round((1 - (1 - rgb.g / 255) * (1 - (255*lighten) / 255)) * 255);
    var b = Math.round((1 - (1 - rgb.b / 255) * (1 - (255*lighten) / 255)) * 255);

    return 'rgba('+r+','+g+','+b+',1)'
  }

  private findCurrentSession(): void {
    for(let i=0; i<this.sessions.length; i++) {
      const id:number = parseInt(this.sessions[i].id);
      this.currentSessionArr[id-1] = this.isCurrentSession(this.sessions[i]);
    }
  }

  private isCurrentSession(session: Session): boolean {

    // handle time difference
    const timeDiffMs = (new Date(session.timeStart).getTimezoneOffset()) * 60 * 1000;
    const timeStart = new Date(session.timeStart).getTime() + timeDiffMs;
    const timeEnd = new Date(session.timeEnd).getTime() + timeDiffMs;

    // optional: change current date (time and/or day) for testing purposes
    const changeTime = (hour: number, min: number, day?: number, month?: number): number => {
      let modifiedDate = new Date().setHours(hour, min);
      if(month) {
        modifiedDate = new Date(modifiedDate).setMonth(month-1, day);
      };
      console.warn( 'TIME MODIFIED: ', new Date(modifiedDate) );
      return modifiedDate;
    }
    let newTime = null;
    // newTime = changeTime(10,0, 3, 7);

    const now = new Date( newTime || new Date().getTime() ).getTime();
    const start = new Date(timeStart).getTime();
    const end = new Date(timeEnd).getTime();

    // is current Session?
    if(now >= start && now  < end) {
      this.highlightNextSession(session, now, timeEnd, timeDiffMs);
      return true;
    } else {
      return false;
    }
  }

  private highlightNextSession(session, now, timeEnd, timeDiffMs): void {
    const nextSession = this.sessions[session.id] || null;
    const endOfCurrentSessionMs = timeEnd - now;

    const endCurrentSession = () => {
      this.timeOutArr[this.timeOutArr.length] = window.setTimeout((session) => {
        console.log('mitchLog >> currentSession ended');
        this.currentSessionArr[session.id-1] = false; //set last session to false
      }, endOfCurrentSessionMs, session);
    }

    const startNextSession = (startOfNextSessionMs) => {
      this.timeOutArr[this.timeOutArr.length] = window.setTimeout((session) => {
        console.log('mitchLog >> next session started');
        this.currentSessionArr[session.id] = true;
      }, startOfNextSessionMs, session);
    }

    if(nextSession === null) { // no next session -> Just end current session
      endCurrentSession();
    } else { //end current session and prepare next Session
      const nextSessionTimeStart = new Date(nextSession.timeStart).getTime() + timeDiffMs;
      const startOfNextSessionMs = nextSessionTimeStart - now;
      endCurrentSession();
      startNextSession(startOfNextSessionMs);
    }
  }

  ngOnInit() {
    console.log('mitchLog >> ngOnInit: session-list');
    this.findCurrentSession();
    console.log('mitchLog >> ', this.currentSessionArr);
  }

  ngOnDestroy() {
    this.timeOutArr.forEach(timeOutId => {
      clearTimeout(timeOutId);
    });
    console.log('mitchLog >> ngOnDestroy: session-list');
  }

}
