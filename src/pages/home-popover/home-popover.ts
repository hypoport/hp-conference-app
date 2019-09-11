import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, App } from 'ionic-angular';
import {SettingsPage} from '../settings/settings';
import {OverviewPage} from '../overview/overview';
import {FeedbackPage} from '../feedback/feedback';
import {BrandProvider} from '../../providers/brand/brand';
import {GlobalProvider} from '../../providers/global/global';

/**
 * Generated class for the HomePopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-popover',
  templateUrl: 'home-popover.html',
})
export class HomePopoverPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public app: App, public brandProvider: BrandProvider, public globalProvider: GlobalProvider) {
  }

  public openSettingsPage(){
	this.viewCtrl.dismiss().then(() => {
	  	this.app.getRootNav().push(SettingsPage);
	});
  }
  public openFeedbackPage(){
	this.viewCtrl.dismiss().then(() => {
	  	this.app.getRootNav().push('FeedbackPage');
	});
  }
  public exitConference(){
	 this.viewCtrl.dismiss().then(() => {
    this.globalProvider.activeFilters = [];
    this.brandProvider.switchBrandTheme('hp');
		this.app.getRootNav().setRoot(OverviewPage);
	});
  }

}
