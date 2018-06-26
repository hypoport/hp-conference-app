import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
