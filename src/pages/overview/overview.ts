import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
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
    private conferenceService: ConferenceService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverviewPage');
  }

  public goToConference() {
    this.globalProvider.conferenceId = "0";
    this.navCtrl.push(TabsPage);
  }

  public addConference(conferenceCode: string, conferencePassword: string) {
    this.conferenceService.addConference(conferenceCode, conferencePassword)
      .then(() => {
        console.log("conference added");
        this.goToConference()
      });
  }
}
