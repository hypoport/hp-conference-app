import {Component} from '@angular/core';
import {ActionSheetButton, ActionSheetController, ActionSheetOptions, App, Config, Refresher, ToastController} from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {ExhibitorService} from "../../providers/exhibitor/exhibitor-service";
import {Exhibitor} from "../../models/exhibitor";
import {ExhibitorPage} from '../exhibitor/exhibitor';

@Component({
  selector: 'page-exhibitors',
  templateUrl: 'exhibitors.html'
})
export class ExhibitorsPage {

  exhibitors: Array<Exhibitor> = [];

  constructor(private globalProvider: GlobalProvider,
    private exhibitorService: ExhibitorService,
    private toastCtrl: ToastController,
    private config: Config,
    private actionSheetCtrl: ActionSheetController,
    private app: App,
    ) {
  }

  ionViewDidLoad() {
    this.exhibitorService.getExhibitors(this.globalProvider.conferenceId).then((exhibitors) => {
      this.exhibitors = exhibitors;
    });
  }
  ionViewDidEnter(){
    /*if(this.globalProvider.conferenceId){
      this.ga.trackView('conf/ep/'+this.globalProvider.conferenceId+'/speakers');
    } else {
      this.ga.trackView('speakersPage');
    }*/
  }

  public refreshExhibitors(refresher: Refresher) {
    this.exhibitorService.loadExhibitors(this.globalProvider.conferenceId,this.globalProvider.conferenceToken).then((exhibitors: Array<Exhibitor>) => {
      this.exhibitors = exhibitors;
      refresher.complete();
      const toast = this.toastCtrl.create({
        message: "Aussteller wurden aktualisiert",
        duration: 2000,
        position: "top"
      });
      toast.present();
    });
  }

  public goToExhibitorsPage(exhibitor) {
    this.app.getRootNav().push(ExhibitorPage, {exhibitor: exhibitor});
  }

}
