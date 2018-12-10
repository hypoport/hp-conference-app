import {Component} from "@angular/core";
import {App, Refresher, ToastController} from "ionic-angular";
import {AgendaService} from "../../providers/agenda/agenda-service";
import {GlobalProvider} from "../../providers/global/global";
import {Agenda} from "../../models/agenda";
import {Session} from "../../models/session";
import {SessionPage} from "../session/session";
import {FavoritesService} from "../../providers/favorites/favorites-service";

@Component({
  selector: "page-agenda",
  templateUrl: "agenda.html"
})
export class AgendaPage {

  sessions: Array<Session> = [];
  isFavorite: boolean;

  constructor(private globalProvider: GlobalProvider,
    private agendaService: AgendaService,
    private favoritesService: FavoritesService,
    private toastCtrl: ToastController,
    private app: App) {
  }

  ionViewDidLoad() {
    this.agendaService.getAgenda(this.globalProvider.conferenceId).then((agenda) => {
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

  public goToSessionDetail(session: any) {
    console.log("goto session");
    this.app.getRootNav().push(SessionPage, {session: session});
    //let sessionModal = this.modalCtrl.create(SessionPage, { session: session });
    //sessionModal.present();
  }

}
