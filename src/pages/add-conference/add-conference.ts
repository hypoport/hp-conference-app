import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ConferenceService } from "../../providers/conference/conference-service";
import {TabsPage} from '../tabs/tabs';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

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
  private qrScanner: QRScanner,
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
		     this.goToConference(conference.id);
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
	  // Optionally request the permission early
	  this.qrScanner.prepare()
	  .then((status: QRScannerStatus) => {
	     if (status.authorized) {
	       // camera permission was granted
	
	
	       // start scanning
	       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
	         console.log('Scanned something', text);
	
	         this.qrScanner.hide(); // hide camera preview
	         scanSub.unsubscribe(); // stop scanning
	       });
	
	     } else if (status.denied) {
	       // camera permission was permanently denied
	       // you must use QRScanner.openSettings() method to guide the user to the settings page
	       // then they can grant the permission from there
	     } else {
	       // permission was denied, but not permanently. You can ask for permission again at a later time.
	     }
	  })
	  .catch((e: any) => console.log('Error is', e));
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
