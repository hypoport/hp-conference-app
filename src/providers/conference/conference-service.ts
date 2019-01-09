import {Injectable} from "@angular/core";
import {Conference} from "../../models/conference";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {GlobalProvider} from "../../providers/global/global";

import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import {AgendaService} from "../agenda/agenda-service";
import {SpeakerService} from "../speaker/speaker-service";

const STORAGE_KEY = "conferences";

@Injectable()
export class ConferenceService {

  private conferences: Map<string, Conference> = new Map<string, Conference>();

  constructor(private http: HttpClient,
    private storage: Storage,
    private agendaService: AgendaService,
    private speakerService: SpeakerService,
    private global: GlobalProvider) {
  }

  public addConference(conferenceCode: string, conferencePassword: string): Promise<Conference> {

    const url = this.global.apiURL('auth');

    return this.http.post(url, {
      "key": conferenceCode,
      "password": conferencePassword,
      "uuid": 'naap'
    }, {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).toPromise()
      .then((conference: Conference): Conference => {
        this.conferences.set(conference.id.toString(), conference);
        this.storage.set(STORAGE_KEY, this.conferences);
        this.agendaService.loadAgenda(conference.id);
        this.speakerService.loadSpeakers(conference.id);
        return conference;
      });
  }

  public loadConference(conferenceId: string): Promise<Conference> {
    const url = this.global.apiURL('conference');
    return this.http.post(url, {
      "key": conferenceId,
      "uuid": 'naap'
    }, {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).toPromise()
      .then((conference: Conference): Conference => {
        this.conferences.set(conference.id.toString(), conference);
        this.storage.set(STORAGE_KEY, this.conferences);
        this.agendaService.loadAgenda(conference.id);
        this.speakerService.loadSpeakers(conference.id);
        return conference;
      });      
  }

  public removeConference(conferenceId: string): Promise<Map<string, Conference>> {
  	this.conferences.forEach((val,key,confs) => {
	  if(val.id.toString() == conferenceId.toString()){
		   this.conferences.delete(key);
		   console.log(this.conferences);
	       this.storage.set(STORAGE_KEY, this.conferences);
		}
  	});
  	
    return Promise.resolve(this.conferences);
  }

  public getConference(conferenceId: string): Conference {
    return this.conferences.get(conferenceId.toString());
  }

  public getAllConferences(): Promise<Map<string, Conference>> {
    if (this.conferences.size == 0) {
      return this.storage.get(STORAGE_KEY).then((data) => {
        if (data && data.size > 0) {
          this.conferences = data;
        }
        return this.conferences
      });
    }
    return Promise.resolve(this.conferences);
  }
}
