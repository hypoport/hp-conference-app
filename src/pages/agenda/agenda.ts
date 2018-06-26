import {Component} from "@angular/core";
import {Refresher, ToastController, ModalController} from "ionic-angular";
import {AgendaService} from "../../providers/agenda/agenda-service";
import {GlobalProvider} from "../../providers/global/global";
import {Agenda} from "../../models/agenda";
import {Session} from "../../models/session";
import { SessionPage } from "../session/session";

@Component({
  selector: "page-agenda",
  templateUrl: "agenda.html"
})
export class AgendaPage {

  sessions: Array<Session> = [];

  constructor(private globalProvider: GlobalProvider,
    private agendaService: AgendaService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log(this.agendaService.getAgenda(this.globalProvider.conferenceId));
    this.agendaService.getAgenda(this.globalProvider.conferenceId).then((agenda) => {
      this.sessions = agenda.sessions;
    });
  }

  public refreshAgenda(refresher: Refresher) {
    this.agendaService.loadAgenda(this.globalProvider.conferenceId).then((agenda: Agenda) => {
      this.sessions = agenda.sessions;
      refresher.complete();
      const toast = this.toastCtrl.create({
        message: "Agenda wurde aktualisiert",
        duration: 3000
      });
      toast.present();
    });
  }

  public goToSessionDetail(session: any) {
    console.log("goto session");
    let sessionModal = this.modalCtrl.create(SessionPage, { session: session });
    sessionModal.present();
  }
}
