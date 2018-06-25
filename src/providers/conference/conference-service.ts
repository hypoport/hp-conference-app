import {Injectable} from "@angular/core";
import {Conference} from "../../models/conference";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";

import "rxjs/add/observable/of";
import "rxjs/add/operator/map";

const STORAGE_KEY = "conferences";

@Injectable()
export class ConferenceService {

  private conferences: Map<string, Conference> = new Map<string, Conference>();

  constructor(private http: HttpClient, private storage: Storage) {
  }

  public addConference(conferenceCode: string, conferencePassword: string): Promise<Conference> {
    // TODO richtige API nutzen
    // this.http.post("")
    let url = "assets/data/conference" + (this.conferences.size % 4) + ".json";
    return this.http.get(url).toPromise()
      .then((conference: Conference): Conference => {
        this.conferences.set(conference.id, conference);
        this.storage.set(STORAGE_KEY, JSON.stringify(this.conferences));
        return conference;
      });
  }

  public getConference(conferenceId: string): Conference {
    return this.conferences.get(conferenceId);
  }

  public getAllConferences() {
    if(this.conferences.size == 0) {
      this.storage.get(STORAGE_KEY).then((cache) => {
        if(cache.toString() !== "{}") {
          this.conferences = new Map(JSON.parse(cache));
        }
      });
    }
    return this.conferences;  }
}
