import {Injectable} from "@angular/core";
import {Conference} from "../../models/conference";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";

import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import {AgendaService} from "../agenda/agenda-service";

const STORAGE_KEY = "conferences";

@Injectable()
export class ConferenceService {

  private conferences: Map<string, Conference> = new Map<string, Conference>();

  constructor(private http: HttpClient,
    private storage: Storage,
    private agendaService: AgendaService) {
  }

  public addConference(conferenceCode: string, conferencePassword: string): Promise<Conference> {
    // TODO richtige API nutzen
    // this.http.post("")
    let url = "assets/data/conference" + (this.conferences.size % 4) + ".json";
    return this.http.get(url).toPromise()
      .then((conference: Conference): Conference => {
        this.conferences.set(conference.id, conference);
        this.storage.set(STORAGE_KEY, this.conferences);
        this.agendaService.loadAgenda(conference.id);
        return conference;
      });
  }

  public loadConference(conferenceId: string): Promise<Conference> {
    // TODO API ansprechen um aktuelle Konferenz-Daten zu laden
    return Promise.resolve(this.getConference(conferenceId));
  }

  public getConference(conferenceId: string): Conference {
    return this.conferences.get(conferenceId);
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
