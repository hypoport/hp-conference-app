import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {AddConferencePage} from '../add-conference/add-conference';

import {GlobalProvider} from '../../providers/global/global';
import {ConferenceService} from "../../providers/conference/conference-service";

/**
 * Generated class for the OverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {

  constructor(private navCtrl: NavController,
    private globalProvider: GlobalProvider,
    private conferenceService: ConferenceService,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverviewPage');
  }

  public goToConference() {
    this.globalProvider.conferenceId = "0";
    this.navCtrl.push(TabsPage);
  }
  
  public presentAddConferenceModal() {
 	 let addModal = this.modalCtrl.create(AddConferencePage, {  });
 	 addModal.present();
   }
}
