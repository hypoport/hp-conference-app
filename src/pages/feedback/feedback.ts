
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform, LoadingController, AlertController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import { GlobalProvider } from '../../providers/global/global';
import { ConferenceService } from '../../providers/conference/conference-service';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { Device } from '@ionic-native/device';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  feedback;


    constructor(public navCtrl: NavController,
    			  public navParams: NavParams,
    			  private platform: Platform,
    			  private global: GlobalProvider,
    			  public loadingCtrl: LoadingController,
    			  public alertCtrl: AlertController,
    			  private device: Device,
            private conferenceService: ConferenceService,
    			  public http: HttpClient,
            private ga: GoogleAnalytics
          ) {  }

  ionViewDidLoad() {
    this.ga.trackView('feedbackPage');
  }

  submitFeedback(){

  let conference = this.conferenceService.getConference(this.global.conferenceId);

	 let postData = 'feedback='+encodeURIComponent(this.feedback)
      				+'&udid='+encodeURIComponent(this.device.uuid)
	  				+'&plat='+encodeURIComponent(this.device.platform)
	  				+'&vers='+encodeURIComponent(this.device.version)
	  				+'&manu='+encodeURIComponent(this.device.manufacturer)
            +'&confId='+encodeURIComponent(this.global.conferenceId)
            +'&confBrand='+encodeURIComponent(conference.brand)
            +'&confTitle='+encodeURIComponent(conference.title)
	  				+'&appv='+encodeURIComponent(this.global.appVersion());

	  if(this.feedback.length <= 0){
		  let alert = this.alertCtrl.create({
		    title: 'Error',
		    subTitle: 'Please provide any feedback before sending',
		    buttons: ['Ok']
		  });
		  alert.present();
		  return;
	  }

	  let loading = this.loadingCtrl.create({
	    content: 'Sende Feedback...',
	    duration: 20000
	  });
      loading.present();

	  this.sendFeedback(postData).then((send) => {
	      loading.dismiss();
		  if(send){
        setTimeout(()=>{this.navCtrl.pop();},500);
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
      // @ts-ignore
      return this.http.post('https://tagungsapp.hypoport.de/api/feedback',data,{
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
