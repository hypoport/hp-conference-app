import {Injectable} from '@angular/core';
import {Agenda} from '../../models/agenda';
import {Session} from '../../models/session';
import {Speaker} from '../../models/speaker';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Device} from '@ionic-native/device';
import {GlobalProvider} from "../../providers/global/global";
import {FavoritesService} from "../favorites/favorites-service";
import {SpeakerService} from "../speaker/speaker-service";

const STORAGE_KEY = "agendas";
const STORAGE_KEY_RAITINGS = "raitedSessions";

@Injectable()
export class AgendaService {

  private agendas: Map<string, Agenda> = new Map<string, Agenda>();

  constructor(private http: HttpClient,
  			  private storage: Storage,
  			  private global: GlobalProvider,
  			  private favoritesService: FavoritesService,
  			  private speakerService: SpeakerService,
  			  private device: Device) {
  }

  public loadAgenda(conferenceId: string, token: string): Promise<Agenda> {
    console.log("load agenda");

    let url = this.global.apiURL('conference/agenda');
    return this.http.post(url, {
      "key": conferenceId,
      "token": token,
      "uuid": this.device.uuid
    }, {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).toPromise()
      .then((response: any) => {

	  	let agenda = response.data.agenda as Agenda;
	  	let speaker = response.data.speakers as Array<Speaker>;

	  	console.log("agenda", agenda);

        if(this.agendas.set(conferenceId, agenda)){
        	this.storage.set(STORAGE_KEY, this.agendas);
        }

        this.speakerService.setSpeaker(conferenceId,speaker);

        return agenda;
      }).then((agenda) => {
        this.favoritesService.rescheduleNotifications(agenda, conferenceId);
        return agenda;
      });
  }

  public getAgenda(conferenceId: string): Promise<Agenda> {
    return this.getAgendas().then((agendas) => {
      return agendas.get(conferenceId);
    });
  }

  public getNextAgendaPoint(conferenceId: string): Promise<Session> {
    return this.getAgendas().then( async (agendas) => {
      let agenda = await agendas.get(conferenceId);
      if(!agenda || !agenda.sessions) return null;
        let now = new Date();
        let latest = null;

	  	  agenda.sessions.forEach( (session) => {
	  		if( new Date(session.timeStart).getTime() > now.getTime() - (now.getTimezoneOffset() * 60000) || (new Date(session.timeEnd).getTime()-1000) > now.getTime() - (now.getTimezoneOffset() * 60000)){
	  			if(!latest) latest = session;
		  	}
	  	});
	  	return latest;
    });
  }

  public getAgendas(): Promise<Map<string, Agenda>> {
    if (this.agendas.size == 0) {
      console.log("get agendas");
      return this.storage.get(STORAGE_KEY).then((data) => {
        console.log("data", data);
        if (data && data.size > 0) {
          this.agendas = data;
        }
        return this.agendas
      });
    }
    console.log("return Promise with agendas");
    return Promise.resolve(this.agendas);
  }

  public saveSessionRaiting(conferenceId, sessionId, raiting){
    return this.storage.get(STORAGE_KEY_RAITINGS).then((data) => {
      console.log('here');
      console.log(data);
      if(!data){
        data = [];
      }
      data[String(conferenceId+'-'+sessionId)] = raiting;
      this.storage.set(STORAGE_KEY_RAITINGS, data);
      return true;
    });
  }
  public getSessionRaiting(conferenceId, sessionId){
    return this.storage.get(STORAGE_KEY_RAITINGS).then((data) => {
      if(!data){
        return false;
      }
      if(!data[String(conferenceId+'-'+sessionId)]){
        return false;
      } else {
        return data[String(conferenceId+'-'+sessionId)];
      }
    });
  }

}
