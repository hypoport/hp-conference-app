import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { App, IonicPage, NavController, NavParams, ViewController, Content, Platform, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

import { ConferenceService } from "../../providers/conference/conference-service";
import { AgendaService } from "../../providers/agenda/agenda-service";
import { Session } from '../../models/session';
import { Speaker } from '../../models/speaker';
import { Device } from '@ionic-native/device';

/**
 * Generated class for the SessionFeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-session-feedback',
  templateUrl: 'session-feedback.html',
})
export class SessionFeedbackPage {

  ratedValue: Number = 1;
  session: Session;
  speakers: Array<Speaker>;
  feedback: string = "";

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  private conferenceService: ConferenceService,
  private agendaService: AgendaService,
  public viewCtrl: ViewController,
  public alertCtrl: AlertController,
  public loadingCtrl: LoadingController,
  private globalProvider: GlobalProvider,
  public app: App,
  private device: Device,
  public http: HttpClient,
  private toastCtrl: ToastController
  ) {
    this.session = navParams.get('session');
    this.ratedValue = navParams.get('raiting');
    this.speakers = navParams.get('speakers');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  public setRaiting(raiting){
    if(raiting){
      this.ratedValue = raiting;
    }
  }

  submitFeedback(){

  let conference = this.conferenceService.getConference(this.globalProvider.conferenceId);

	 let postData = 'raiting='+(this.ratedValue)
              +'&sessionTitle='+encodeURIComponent(this.session.title)
              +'&sessionId='+encodeURIComponent(this.session.id)
              +'&feedback='+encodeURIComponent(this.feedback)
      				+'&udid='+encodeURIComponent(this.device.uuid)
	  				+'&plat='+encodeURIComponent(this.device.platform)
	  				+'&vers='+encodeURIComponent(this.device.version)
	  				+'&manu='+encodeURIComponent(this.device.manufacturer)
            +'&confId='+encodeURIComponent(this.globalProvider.conferenceId)
            +'&confBrand='+encodeURIComponent(conference.brand)
            +'&confTitle='+encodeURIComponent(conference.title)
	  				+'&appv='+encodeURIComponent(this.globalProvider.appVersion());

	  let loading = this.loadingCtrl.create({
	    content: 'Sende Bewertung...',
	    duration: 20000
	  });
      loading.present();

	  this.sendFeedback(postData).then((send) => {
	      loading.dismiss();
		  if(send){

        this.agendaService.saveSessionRaiting(this.globalProvider.conferenceId,this.session.id,this.ratedValue);

        setTimeout(()=>{this.viewCtrl.dismiss();},500);
        setTimeout(()=>{
          		    let toast = this.toastCtrl.create({
          				 message: this.globalProvider.getLabel('sessionRaitingSuccess') ? this.globalProvider.getLabel('sessionRaitingSuccess') : 'Vielen Dank für Ihre Bewertung!',
          				 duration: 3000,
          				 position: 'top',
          				 showCloseButton: true,
          				 closeButtonText: 'OK'
          			});
          		    toast.present();
        },1000);
		  } else {
			  let alert = this.alertCtrl.create({
			    title: 'Ooops!',
			    subTitle: 'Senden fehlgeschlagen. Versuchen Sie es zu einem späteren Zeitpunkt nochmal.',
			    buttons: ['Ok']
			  });
			  alert.present();
		  }
	  }).catch( (e) => {

		  let alert = this.alertCtrl.create({
		    title: 'Ooops!',
        subTitle: 'Senden fehlgeschlagen. Versuchen Sie es zu einem späteren Zeitpunkt nochmal.',
		    buttons: ['Ok']
		  });
		  alert.present();
	  });

  }

  private sendFeedback(data): Promise<boolean> {
      let url = this.globalProvider.apiURL('feedback/session');
      // @ts-ignore
      return this.http.post(url,data,{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).toPromise()
		    .then(data => {
          // @ts-ignore
				  let success = data.success;
				  if(success){
					  return true;
				  } else {
					return false;
				  }
	   }).catch( e => { return false; });
  }

}
