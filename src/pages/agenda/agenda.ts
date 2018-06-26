import {Component} from "@angular/core";
import {Refresher, ToastController} from "ionic-angular";
import {AgendaService} from "../../providers/agenda/agenda-service";
import {GlobalProvider} from "../../providers/global/global";
import {Agenda} from "../../models/agenda";
import {Session} from "../../models/session";

@Component({
  selector: "page-agenda",
  templateUrl: "agenda.html"
})
export class AgendaPage {

  sessions: Array<Session> = [];

  constructor(private globalProvider: GlobalProvider,
    private agendaService: AgendaService,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.agendaService.getAgenda(this.globalProvider.conferenceId).then((agenda) => {
      this.sessions = agenda.sessions;
    });
  }

  public refreshAgenda(refresher: Refresher) {
    this.agendaService.loadAgenda(this.globalProvider.conferenceId).then((agenda: Agenda) => {
      console.log("loaded agenda", agenda);
      this.sessions = agenda.sessions;
      console.log("sessions", this.sessions);
      refresher.complete();
      const toast = this.toastCtrl.create({
        message: "Agenda wurde aktualisiert",
        duration: 3000
      });
      toast.present();
    });
  }

  public goToSessionDetail(session: any) {
    console.log("goto session", session);
    // this.navCtrl.push(SessionDetailPage, { sessionId: sessionData.id, name: sessionData.name });
  }
}
