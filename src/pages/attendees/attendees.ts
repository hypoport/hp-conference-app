import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ConferenceService } from "../../providers/conference/conference-service";
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { OverviewPage } from '../overview/overview';

/**
 * Generated class for the AttendeesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendees',
  templateUrl: 'attendees.html',
})
export class AttendeesPage {

  attendees: Array<any> = [];
  attendeesFiltered: Array<any> = [];

  cachedPassword: boolean = true;
  confPassword: string = "";

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  private conferenceService: ConferenceService,
  public viewCtrl: ViewController,
  private globalProvider: GlobalProvider,
  public app: App,
  private toastCtrl: ToastController,
  public loadingCtrl: LoadingController
  ) {
  }

  ionViewWillEnter(){
    // if navigated directly or spoiled app cache: redirect to wallet
    if(!this.globalProvider.conferenceId){
      this.navCtrl.setRoot(OverviewPage);
    }
  }

  ionViewDidLoad() {
    if(this.globalProvider.conferenceId){
      this.conferenceService.getConferencePassword(this.globalProvider.conferenceId).then((password)=>{
        this.cachedPassword = true;
        if(password && password.length){
          this.confPassword = password;
          // wait for page transition
          setTimeout(()=>{
            this.getAttendees(this.confPassword, this.globalProvider.conferenceId, this.globalProvider.conferenceToken);
          },430);
        } else {
          this.cachedPassword = false;
        }
      });
    }
  }

  getAttendees(conferencePassword: string,key: string,token: string){

    if(typeof conferencePassword === 'undefined' || conferencePassword == ""){
    let toast = this.toastCtrl.create({
      message: 'Bitte geben Sie ein Tagungs-Passwort an.',
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
    this.cachedPassword = false;

    } else {

    const loader = this.loadingCtrl.create({
        content: "Lade Teilnehmerliste …",
        duration: 30000,
        dismissOnPageChange: true,
    });

    if(!this.cachedPassword) loader.present();

    this.conferenceService.loadConferenceAttendees(key,token, conferencePassword)
        .then((attendees) => {
         loader.dismiss();
         if(attendees.data){
            this.attendees = attendees.data;
            this.attendeesFiltered = this.attendees;
         } else {
           this.cachedPassword = false;
         }
        }).catch((error) => {
        this.cachedPassword = false;
        loader.dismiss();

        let message = "Teilnehmerliste aktuell nicht verfügbar. Versuchen Sie es zu einem späteren Zeitpunkt nochmal.";
        if(error.status == 403){
          message = "Tagungs-Passwort ungültig.";
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
  /*
    Filter attendees
  */
  filterAttendees(ev: any) {

    this.attendeesFiltered = this.attendees;
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.attendeesFiltered = this.attendeesFiltered.filter((attendee) => {
        return (
           attendee.vorname && attendee.vorname.toLowerCase().indexOf(val.toLowerCase()) > -1
        || attendee.nachname && attendee.nachname.toLowerCase().indexOf(val.toLowerCase()) > -1
        || attendee.firma && attendee.firma.toLowerCase().indexOf(val.toLowerCase()) > -1
        || attendee.unternehmen && attendee.unternehmen.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      })
    }
  }

}
