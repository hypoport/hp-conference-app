import {Injectable} from '@angular/core';
import {Agenda} from '../../models/agenda';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";

const STORAGE_KEY = "agendas";

@Injectable()
export class AgendaService {

  private agendas: Map<string, Agenda> = new Map<string, Agenda>();

  constructor(private http: HttpClient, private storage: Storage) {
  }

  public loadAgenda(conferenceId: string): Promise<Agenda> {
    console.log("load agenda");
    // TODO richtige API nutzen
    let url = "assets/data/agenda.json";
    return this.http.get(url).toPromise()
      .then((agenda: Agenda): Agenda => {
        console.log("agenda", agenda);
        this.agendas.set(conferenceId, agenda);
        this.storage.set(STORAGE_KEY, this.agendas);
        return agenda;
      });
  }

  public getAgenda(conferenceId: string): Agenda {
    return this.agendas.get(conferenceId);
  }

  public getAgendas(): Promise<Map<string, Agenda>> {
    if (this.agendas.size == 0) {
      return this.storage.get(STORAGE_KEY).then((data) => {
        if (data.size > 0) {
          this.agendas = data;
        }
        return this.agendas
      });
    }
    return Promise.resolve(this.agendas);
  }

}
