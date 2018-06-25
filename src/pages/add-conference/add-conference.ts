import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ConferenceService } from "../../providers/conference/conference-service";
import {TabsPage} from '../tabs/tabs';


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

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams, 
  private conferenceService: ConferenceService,
  public viewCtrl: ViewController,
  private globalProvider: GlobalProvider,
  public app: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddConferencePage');
  }
  
  public goToConference(id: string){
	  this.globalProvider.conferenceId = id;
	  this.app.getRootNav().push(TabsPage);
	  this.viewCtrl.dismiss();

  }
    
  public addConference(conferenceCode: string, conferencePassword: string) {
    this.conferenceService.addConference(conferenceCode, conferencePassword)
      .then((conference) => {

	    this.goToConference(conference.id);
        console.log("conference added");

      });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
