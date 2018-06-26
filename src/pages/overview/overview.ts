import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {AddConferencePage} from '../add-conference/add-conference';

import {GlobalProvider} from '../../providers/global/global';
import {ConferenceService} from "../../providers/conference/conference-service";
import {Conference} from '../../models/conference';

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
    private conferenceService: ConferenceService,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverviewPage');
  }

  ionViewWillEnter() {
    let today = new Date();
    this.nextConferences.length = 0;
    this.lastConferences.length = 0;
    this.conferenceService.getAllConferences().then((conferences) => {
      if (!conferences) {
        return;
      }
      conferences.forEach(conference => {
        if (new Date(conference.endDate) < today) {
          this.lastConferences.push(conference);
        }
        else if (new Date(conference.startDate) > today) {
          this.nextConferences.push(conference);
        }
      });
      this.sortByStartDate(this.nextConferences);
      this.sortByEndDate(this.lastConferences);
      if (this.nextConferences.length > 0) {
        this.currentConference = this.nextConferences.pop();
      }
      else {
        this.currentConference = this.lastConferences.pop();
      }
    });
  }

  public goToConference() {
    this.globalProvider.conferenceId = "0";
    this.navCtrl.push(TabsPage);
  }

  presentAddConferenceModal() {
    let addModal = this.modalCtrl.create(AddConferencePage, {});
    addModal.present();
  }

  private sortByStartDate(conferences: Array<Conference>): void {
    conferences.sort((a: Conference, b: Conference) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    })
  }

  private sortByEndDate(conferences: Array<Conference>): void {
    conferences.sort((a: Conference, b: Conference) => {
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    })
  }
}
