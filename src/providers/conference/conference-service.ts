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
    console.log("asdf", this.conferences);
    this.storage.get(STORAGE_KEY).then((foo: string) => {
      console.log("---------", foo);
      if (foo) {
        console.log("?????");
        this.conferences = new Map(JSON.parse(foo));
      }
    });
  }

  public addConference(conferenceCode: string, conferencePassword: string): Promise<Conference> {
    // TODO richtige API nutzen
    // this.http.post("")
    console.log("conferences", this.conferences, this.conferences.size);
    let url = "assets/data/conference" + (this.conferences.size % 4) + ".json";
    console.log("url", url);
    return this.http.get(url).toPromise()
      .then((conference: Conference): Conference => {
        this.conferences.set(conference.id, conference);
        this.storage.set(STORAGE_KEY, JSON.stringify(this.conferences));
        return conference;
      });
  }

  public getConference(conferenceId: string): Conference {
    console.log("conferences", this.conferences);
    return this.conferences.get(conferenceId);
  }

}
