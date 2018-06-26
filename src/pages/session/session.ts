import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
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

  constructor(private navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionPage');
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter SessionPage");
    this.session = this.navParams.get('session');
    console.log("session passed: " + this.session);
  }
}
