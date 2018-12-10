import { Component, Input } from '@angular/core';
import { App } from "ionic-angular";
import { Session } from "../../models/session";
import {SessionPage} from "../../pages/session/session";

/**
 * Generated class for the AgendaListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'agenda-list',
  templateUrl: 'agenda-list.html'
})
export class AgendaListComponent {

  sessions: Array<Session> = [];
  
  @Input()
  set sessionList(sessions: Array<Session>) {
  	this.sessions = sessions;
  }
  
  constructor(private app: App) {

  }

  public goToSessionDetail(session: any) {
    this.app.getRootNav().push(SessionPage, {session: session});
  }

}
