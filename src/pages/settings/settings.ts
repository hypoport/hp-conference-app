import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private globalProvider: GlobalProvider,
    private iab: InAppBrowser
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  ionViewDidEnter(){
    //  this.ga.trackView('settingsPage');
  }
  openCLog(){
    this.iab.create('https://github.com/hypoport/hp-conference-app/commits/master','_system',{location:'no'});
  }
  openLandingpage(){
    this.iab.create('https://tagungsapp.hypoport.de/','_system',{location:'no'});
  }
  openDS(){
    this.iab.create('https://tagungsapp.hypoport.de/datenschutz','_system',{location:'no'});
  }
  openSupport(){
    this.iab.create('https://tagungsapp.hypoport.de/support','_system',{location:'no'});
  }
}
