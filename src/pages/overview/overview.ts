import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {GlobalProvider} from '../../providers/global/global';
import {ConferenceService} from "../../providers/conference/conference-service";
import { Conference } from '../../models/conference';

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

  currentConference: Conference;
  lastConferences = new Array<Conference>();
  nextConferences = new Array<Conference>();

  constructor(private navCtrl: NavController,
    private globalProvider: GlobalProvider,
    private conferenceService: ConferenceService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverviewPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter OverviewPage');
    let today = new Date();
    console.log("today=" + today);
    this.conferenceService.getAllConferences().forEach( conference => {
      console.log(conference);
      console.log(conference.endDate);
      if(new Date(conference.endDate) < today) {
        this.lastConferences.push(conference);
      } else if(new Date(conference.startDate) > today) {
        this.nextConferences.push(conference);
      }
    });
    console.log("last: " + this.lastConferences);
    console.log("next: " + this.nextConferences);
    // TODO sortieren der Listen nach Datum
    if(this.nextConferences.length > 0) {
      this.currentConference = this.nextConferences.pop();
    } else {
      this.currentConference = this.lastConferences.pop();
    }
  }

  public goToConference() {
    this.globalProvider.conferenceId = "0";
    this.navCtrl.push(TabsPage);
  }

  public addConference(conferenceCode: string, conferencePassword: string) {
    this.conferenceService.addConference(conferenceCode, conferencePassword)
      .then(() => {
        this.goToConference()
      });
  }
}
