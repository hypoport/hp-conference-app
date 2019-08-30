import {Component} from '@angular/core';
import {ActionSheetButton, ActionSheetController, ActionSheetOptions, App, Config, Refresher, ToastController} from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {ExhibitorService} from "../../providers/exhibitor/exhibitor-service";
import {Exhibitor} from "../../models/exhibitor";

@Component({
  selector: 'page-exhibitor',
  templateUrl: 'exhibitor.html'
})
export class ExhibitorPage {

  exhibitor: Exhibitor;

  constructor(private globalProvider: GlobalProvider,
    private exhibitorService: ExhibitorService,
    private toastCtrl: ToastController,
    private config: Config,
    private actionSheetCtrl: ActionSheetController,
    private app: App,
    ) {
  }

  ionViewDidEnter(){
    /*if(this.globalProvider.conferenceId){
      this.ga.trackView('conf/ep/'+this.globalProvider.conferenceId+'/speakers');
    } else {
      this.ga.trackView('speakersPage');
    }*/
  }

  openContact(exhibitor: Exhibitor) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact',
      buttons: [
        {
          text: `Email ( ${exhibitor.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + exhibitor.email);
          }
        } as ActionSheetButton,
        {
          text: `Call ( ${exhibitor.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + exhibitor.phone);
          }
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }

}
