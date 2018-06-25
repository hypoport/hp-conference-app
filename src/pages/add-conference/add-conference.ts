import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ConferenceService } from "../../providers/conference/conference-service";


/**
 * Generated class for the AddConferencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-conference',
  templateUrl: 'add-conference.html',
})
export class AddConferencePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddConferencePage');
  }
  
  public addConference(conferenceCode: string, conferencePassword: string) {
    this.conferenceService.addConference(conferenceCode, conferencePassword)
      .then(() => {
        console.log("conference added");
        this.goToConference()
      });
  }

}
