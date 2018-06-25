import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { GlobalProvider } from '../../providers/global/global';

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
              private navParams: NavParams,
              private globalProvider: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverviewPage');
  }

  goToConference() {
    this.globalProvider.conferenceId = "foo12";
    this.navCtrl.push(TabsPage);
  }
}
