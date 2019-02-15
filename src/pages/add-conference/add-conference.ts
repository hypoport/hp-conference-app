import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ConferenceService } from "../../providers/conference/conference-service";
import { TabsPage } from '../tabs/tabs';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import CryptoJS from 'crypto-js';

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

  confCode: string;
  confPassword: string;

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  private conferenceService: ConferenceService,
  public viewCtrl: ViewController,
  private globalProvider: GlobalProvider,
  public app: App,
  private toastCtrl: ToastController,
  public loadingCtrl: LoadingController,
  private barcodeScanner: BarcodeScanner,
  private ga: GoogleAnalytics
  ) {
  }

  ionViewDidLoad() {
    this.ga.trackView('addConferencePage');
  }

  public goToConference(newConferenceId: string, newToken: string) {
    this.globalProvider.conferenceId = newConferenceId;
    this.globalProvider.conferenceToken = newToken;
	  this.app.getRootNav().push(TabsPage);
	  this.viewCtrl.dismiss();
  }

  public addConference(conferenceCode: string, conferencePassword: string) {

    if(typeof conferenceCode === 'undefined' || typeof conferencePassword === 'undefined' || conferenceCode == "" || conferenceCode == ""){

		let toast = this.toastCtrl.create({
			message: 'Bitte geben Sie eine Tagungs-Kennung und ein Tagungs-Passwort an.',
			duration: 5000,
			position: 'top',
			showCloseButton: true,
			closeButtonText: 'OK'
		});
		toast.present();

    } else {

		const loader = this.loadingCtrl.create({
		    content: "Lade Tagung …",
		    duration: 30000,
		    dismissOnPageChange: true,
		});
		loader.present();

	    this.conferenceService.addConference(conferenceCode, conferencePassword)
	      .then((conference) => {
		     loader.dismiss();
		     this.goToConference(conference.id,conference.token);
	      }).catch((error) => {

		 	loader.dismiss();

		    let message = "Tagungs-Login aktuell nicht möglich. Versuchen Sie es zu einem späteren Zeitpunkt nochmal.";
		    if(error.status == 403){
			    message = "Tagungs-Kennung und Tagungs-Passwort stimmen nicht überein.";
		    }

		    let toast = this.toastCtrl.create({
				 message: message,
				 duration: 5000,
				 position: 'top',
				 showCloseButton: true,
				 closeButtonText: 'OK'
			});
		    toast.present();

		  });
	}
  }

  openQrReader(){

  		/* example encryption
		let b64 = CryptoJS.AES.encrypt('{	"key": "konf", "pw": "password", "brand": "ep" }', this.globalProvider.qrSecret()).toString();
	    let e64 = CryptoJS.enc.Base64.parse(b64);
	    let eHex = e64.toString(CryptoJS.enc.Hex);

		console.log('test '+eHex); */

		this.barcodeScanner.scan().then(barcodeData => {

    var changedUrl = this.globalProvider.qrHotFix(barcodeData.text);
		var url = new URL(changedUrl);
		var c = url.searchParams.get("c");

		   var reb64 = CryptoJS.enc.Hex.parse(c);
		   var bytes = reb64.toString(CryptoJS.enc.Base64);
		   var decrypt = CryptoJS.AES.decrypt(bytes, this.globalProvider.qrSecret());
		   var plain = decrypt.toString(CryptoJS.enc.Utf8);
		   var data = JSON.parse(plain);

		if(typeof data.key !== 'undefined' && data.key != ""
		&& typeof data.pw !== 'undefined' && data.pw != ""
		&& typeof data.brand !== 'undefined' && data.brand != ""){
			this.addConference(data.key,data.pw);
		} else {
			let toast = this.toastCtrl.create({
				 message: 'Ungültiger Tagungs-QR-Code',
				 duration: 5000,
				 position: 'top',
				 showCloseButton: true,
				 closeButtonText: 'OK'
			});
		    toast.present();
		}

		}).catch(err => {
			console.log(JSON.stringify(err));
			let toast = this.toastCtrl.create({
				 message: 'Fehlerhafter Tagungs-QR-Code',
				 duration: 5000,
				 position: 'top',
				 showCloseButton: true,
				 closeButtonText: 'OK'
			});
		    toast.present();
		});
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
