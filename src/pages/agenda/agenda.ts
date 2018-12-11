import {Component} from "@angular/core";
import {Refresher, ToastController} from "ionic-angular";
import {AgendaService} from "../../providers/agenda/agenda-service";
import {GlobalProvider} from "../../providers/global/global";
import {Agenda} from "../../models/agenda";
import {Session} from "../../models/session";
import {FavoritesService} from "../../providers/favorites/favorites-service";

@Component({
  selector: "page-agenda",
  templateUrl: "agenda.html"
})
export class AgendaPage {

  sessions: Array<Session> = [];
  allSessions: Array<Session> = [];
  isFavorite: boolean;

  constructor(private globalProvider: GlobalProvider,
    private agendaService: AgendaService,
    private favoritesService: FavoritesService,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.agendaService.getAgenda(this.globalProvider.conferenceId).then((agenda) => {
      this.allSessions = agenda.sessions;
      this.sessions = agenda.sessions;
      this.favoritesService.loadFavorites(agenda, this.globalProvider.conferenceId);
    });
  }

  public refreshAgenda(refresher: Refresher) {
    this.agendaService.loadAgenda(this.globalProvider.conferenceId).then((agenda: Agenda) => {
      this.sessions = agenda.sessions;
      refresher.complete();
      const toast = this.toastCtrl.create({
        message: "Agenda wurde aktualisiert",
        duration: 2000,
        position: "top"
      });
      toast.present();
    });
  }

  public segmentChanged(event) {
    if (event.value === "favoriteSessions") {
      this.sessions = this.allSessions.filter((session) => session.isFavorite);
    }
    else {
      this.sessions = this.allSessions;
    }

  }

}
