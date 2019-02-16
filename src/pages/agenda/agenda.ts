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

  activeSegment: string;
  agenda: Agenda;
  sessions: Array<Session> = [];
  favoSessions: Array<Session> = [];
  isFavorite: boolean;

  constructor(private globalProvider: GlobalProvider,
    private agendaService: AgendaService,
    private favoritesService: FavoritesService,
    private toastCtrl: ToastController
    ) {
		this.activeSegment = 'allSessions';
  }

  ionViewDidLoad() {
    this.agendaService.getAgenda(this.globalProvider.conferenceId).then((agenda) => {
	  this.agenda = agenda;
      this.favoritesService.loadFavorites(agenda, this.globalProvider.conferenceId);
      this.sessions = agenda.sessions;
      this.favoSessions = this.sessions.filter((session) => session.isFavorite);
    });
  }

  ionViewWillEnter(){
    this.favoSessions = this.sessions.filter((session) => session.isFavorite);
    /*if(this.globalProvider.conferenceId){
      this.ga.trackView('conf/ep/'+this.globalProvider.conferenceId+'/agenda');
    } else {
      this.ga.trackView('agendaPage');
    }*/
  }

  public refreshAgenda(refresher: Refresher) {
    this.agendaService.loadAgenda(this.globalProvider.conferenceId,this.globalProvider.conferenceToken).then((agenda: Agenda) => {
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
    this.agendaService.getAgenda(this.globalProvider.conferenceId).then((agenda) => {
	  this.agenda = agenda;
      this.favoritesService.loadFavorites(agenda, this.globalProvider.conferenceId);
      this.sessions = agenda.sessions;
      this.favoSessions = this.sessions.filter((session) => session.isFavorite);
    });

  }

}
