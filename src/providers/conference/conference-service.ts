import {Injectable} from "@angular/core";
import {Conference} from "../../models/conference";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";

@Injectable()
export class ConferenceService {

  private conferences: Map<string, Conference> = new Map<string, Conference>();

  constructor(private http: HttpClient) {
  }

  public getConference(conferenceId: string): Promise<Conference> {
    let conference = this.conferences.get(conferenceId);
    if (conference) {
      return Promise.resolve(conference);
    }
    return this.http.get("assets/data/conference.json").toPromise()
      .then((conference: Conference): Conference => {
        this.conferences.set(conference.id, conference);
        return conference;
      });
  }

}
