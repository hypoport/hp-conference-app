import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalProvider} from "../../providers/global/global";
import {Storage} from "@ionic/storage";
import {Device} from '@ionic-native/device';
import {Speaker} from "../../models/speaker";

const STORAGE_KEY = "speakers";

@Injectable()
export class SpeakerService {

  private speakers: Map<string, Array<Speaker>> = new Map<string, Array<Speaker>>();

  constructor(public http: HttpClient, 
  			  private storage: Storage,
  			  private global: GlobalProvider,
  			  private device: Device
  			  ) {
	
  }

  public loadSpeakers(conferenceId: string, token: string): Promise<Array<Speaker>> {
    let url = this.global.apiURL('conference/speaker');
    return this.http.post(url, {
      "key": conferenceId,
      "token": token,
      "uuid": this.device.uuid
    }, {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).toPromise()
      .then((response: any) => {
	   	let speakers = response.data.speakers as Array<Speaker>;
	    this.speakers.set(conferenceId, speakers);
        this.storage.set(STORAGE_KEY, this.speakers);
        return speakers;
      });
  }

  public setSpeaker(conferenceId: string, speakers: Array<Speaker>) {
  	  this.speakers.set(conferenceId, speakers);
      this.storage.set(STORAGE_KEY, this.speakers);
  }
  
  public getSpeaker(conferenceId: string, speakerId: string): Promise<Speaker> {
    return this.getAllSpeakers().then((speakers) => {
      return speakers.get(conferenceId).find((value) => value.id == speakerId);
    });
  }

  public getSpeakers(conferenceId: string): Promise<Array<Speaker>> {
    return this.getAllSpeakers().then((speakers) => {
      return speakers.get(conferenceId);
    });
  }

  public getAllSpeakers(): Promise<Map<string, Array<Speaker>>> {
    if (this.speakers.size == 0) {
      console.log("load speakers");
      return this.storage.get(STORAGE_KEY).then((data) => {
        if (data && data.size > 0) {
          this.speakers = data;
        }
        return this.speakers
      });
    }
    return Promise.resolve(this.speakers);
  }

}
