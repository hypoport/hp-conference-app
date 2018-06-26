import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Session } from '../../models/session';

/**
 * Generated class for the SessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-session',
  templateUrl: 'session.html',
})
export class SessionPage {

  session: Session;

  constructor(private navParams: NavParams,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionPage');
  }

  ionViewWillEnter() {
    this.session = this.navParams.get('session');
    console.log("session passed: " + this.session);
}

  close() {
    this.viewCtrl.dismiss();
  }
}
