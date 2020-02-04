import {Injectable} from "@angular/core";
import {Conference} from "../../models/conference";
import {AppPage} from "../../models/app-page";

import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Device} from '@ionic-native/device';
import {GlobalProvider} from "../../providers/global/global";

import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import {AgendaService} from "../agenda/agenda-service";
import {SpeakerService} from "../speaker/speaker-service";

const STORAGE_KEY = "conferences";
const STORAGE_KEY_PW_LOCKER = "conferencePWLocker";

@Injectable()
export class ConferenceService {

  private conferences: Map<string, Conference> = new Map<string, Conference>();
  private attendeeLists: Map<string, any> = new Map<string, any>();
  private conferencePasswords: Map<string, string> = new Map<string, string>();

  constructor(private http: HttpClient,
    private storage: Storage,
    private agendaService: AgendaService,
    private speakerService: SpeakerService,
    private global: GlobalProvider,
    private device: Device) {
  }

  public addConference(conferenceCode: string, conferencePassword: string): Promise<Conference> {

    const rootUrl = this.global.rootApiUrl();
    return this.http.post(rootUrl,{
        "key": conferenceCode,
      }, {
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      }).toPromise()
      .then((brandResponse: any) => {
        this.global.conferenceBrand = brandResponse.brand;
        let url = this.global.apiURL('auth');
        return this.http.post(url, {
          "key": conferenceCode,
          "password": conferencePassword,
          "uuid": this.device.uuid
        }, {
          headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).toPromise()
          .then((conference: Conference): Conference => {
            // temp date fix!
            conference.startDate = new Date(conference.startDate.toString().replace(' ','T'));
            conference.endDate = new Date(conference.endDate.toString().replace(' ','T'));
            this.conferences.set(conference.id.toString(), conference);
            this.storage.set(STORAGE_KEY, this.conferences);
            this.agendaService.loadAgenda(conference.id, conference.token);
            this.speakerService.loadSpeakers(conference.id, conference.token);
            return conference;
          });
    });
  }

  public loadConference(conferenceId: string, token: string): Promise<Conference> {
    const url = this.global.apiURL('conference');
    return this.http.post(url, {
      "key": conferenceId,
      "token": token,
      "uuid": this.device.uuid
    }, {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).toPromise()
      .then((conference: Conference): Conference => {
        // temp date fix!
        conference.startDate = new Date(conference.startDate.toString().replace(' ','T'));
        conference.endDate = new Date(conference.endDate.toString().replace(' ','T'));
        this.conferences.set(conference.id.toString(), conference);
        if(conference.options){
          this.global.conferenceOptions = conference.options;
        }
        this.storage.set(STORAGE_KEY, this.conferences);
        this.agendaService.loadAgenda(conference.id, token);
        this.speakerService.loadSpeakers(conference.id, token);
        return conference;
      });
  }

  public loadConferenceAttendees(conferenceId: string, token: string, password: string): Promise<any> {
    const url = this.global.apiURL('conference/attendees');

    return new Promise(async (resolve,reject) => {

      // no password given? maybe it's on the saved list
      let cachedPassword = await this.getConferencePassword(conferenceId).then( (cachedPassword) => {
        return cachedPassword;
      });
      if(cachedPassword && !password || password == "") password = cachedPassword;

      // maybe we already loaded the userlist
      let cachedList = await this.attendeeLists.forEach((val,key,atts) => {
         if(conferenceId.toString() == key.toString()){
          return resolve(val);
        }
      });

      if(!cachedList){
        // @ts-ignore
        return resolve(this.http.post(url, {
          "key": conferenceId,
          "token": token,
          "password": password,
          "uuid": this.device.uuid
        }, {
          headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).toPromise()
          .then((attendeelist) => {

            /*
              Save the password:
              at this user knows (for sure) the conference password, he entered it manually – so we can exclude a snatched qr code
              we save it to for future requests with password requiration we just access it
            */
            this.conferencePasswords.set(conferenceId.toString(), password);
            this.storage.set(STORAGE_KEY_PW_LOCKER, this.conferencePasswords);
            // also cache the attendees for current session
            this.attendeeLists.set(conferenceId.toString(), attendeelist);

            return attendeelist;
        }));
      }
    });
  }

  public removeConference(conferenceId: string): Promise<Map<string, Conference>> {
  	this.conferences.forEach((val,key,confs) => {
	  if(val.id.toString() == conferenceId.toString()){
		   this.conferences.delete(key);
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

  /*
    Check if User has entered the conference password manually "once"
    so we can exclude a snatched qr code
  */
  public getConferencePassword(conferenceId: string): Promise<string>{
    if (this.conferencePasswords.size == 0) {
      return this.storage.get(STORAGE_KEY_PW_LOCKER).then((data) => {
        if (data && data.size > 0) {
          this.conferencePasswords = data;
        }
        return Promise.resolve( this.conferencePasswords.get(conferenceId.toString()) );
      });
    } else {
      return Promise.resolve( this.conferencePasswords.get(conferenceId.toString()) );
    }
  }
  /*
    Get Page a specific app page
  */
  public getAppPage(conferenceId: string,identifier: string): Promise<AppPage> {
      let conference = this.conferences.get(conferenceId.toString());
      if(!conference) return Promise.reject('no conference found');
      console.log(conference);
      if(!conference.pages) return Promise.reject('no conference pages found');
      let pages = conference.pages;
      let foundPage;
      pages.forEach((page) => {
        if(page.type == identifier) foundPage = page;
      });
      if(foundPage){
        return Promise.resolve(foundPage);
      } else {
        return Promise.reject('no page with that identifier found');
      }
  }

}
