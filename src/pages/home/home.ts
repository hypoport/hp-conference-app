import {Component, ElementRef, ViewChild} from '@angular/core';
import {Conference} from '../../models/conference';
import {Session} from '../../models/session';

import {QuickAccessCard} from '../../models/quickaccess-card';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';

import {ConferenceService} from '../../providers/conference/conference-service';
import {AgendaService} from '../../providers/agenda/agenda-service';
import {GlobalProvider} from "../../providers/global/global";
import { ToastController, Refresher, App } from 'ionic-angular';

declare const google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  conference: Conference;
  nextSession: Session;

  lastUpdate: Date;

  constructor(
    private app: App,
    private conferenceService: ConferenceService,
    private agendaService: AgendaService,
    private globalProvider: GlobalProvider,
    private toastCtrl: ToastController,
    private iab: InAppBrowser,
    private callNumber: CallNumber) {

  }

  ionViewDidLoad() {
    this.conference = this.conferenceService.getConference(this.globalProvider.conferenceId);

	this.agendaService.getNextAgendaPoint(this.globalProvider.conferenceId).then((session)=>{
		this.nextSession = session;
		console.log('next');
		console.log(this.nextSession);
	});

    this.loadDirection();
  }
  ionViewDidEnter(){

	this.agendaService.getNextAgendaPoint(this.globalProvider.conferenceId).then((session)=>{
		this.nextSession = session;
		console.log(this.nextSession);
	});

	// silently update conference in background
    if(!this.lastUpdate || this.lastUpdate.getTime() - new Date().getTime() > 1000*60){
	    this.lastUpdate = new Date();
	    setTimeout(()=>{
		  this.conferenceService.loadConference(this.globalProvider.conferenceId,this.globalProvider.conferenceToken).then((conference: Conference) => {
			if(conference) this.conference = conference;
	      	console.log('background-update done');
	      });
	    }, 2000); // delay it, so it wont affect the page transition
    }
  }

  loadDirection() {
    let location = {lat: this.conference.directions.location.latitude, lng: this.conference.directions.location.longitude}

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: location,
      mapTypeId: 'roadmap'
    });
    this.map.setCenter(location);
    new google.maps.Marker({
      position: location,
      map: this.map
    });
  }

  public cardAction(card: QuickAccessCard){
    if(card.action == "gotoPage"){
      if(card.data == "attendees") this.app.getRootNav().push('AttendeesPage');
      if(card.data == "settings") this.app.getRootNav().push('SettingsPage');
      if(card.data == "agenda") this.app.getRootNav().getActiveChildNav().select(1);
      if(card.data == "speaker") this.app.getRootNav().getActiveChildNav().select(2);
    } else if(card.action == "openURL") {
        if(card.data != "") this.iab.create(card.data,'_system',{location:'no'});
    }
  }
  public openMail(mail){
    if(mail){
      window.open(`mailto:${mail}`, '_system');
    }
  }
  public openTel(tel){
    if(tel){
      this.callNumber.callNumber(tel, false)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }
  }
  public refreshConference(refresher: Refresher) {
    this.conferenceService.loadConference(this.globalProvider.conferenceId, this.globalProvider.conferenceToken).then((conference: Conference) => {
      this.conference = conference;
      refresher.complete();
      const toast = this.toastCtrl.create({
        message: "Info wurde aktualisiert",
        duration: 2000,
        position: "top"
      });
      toast.present();
      this.lastUpdate = new Date();

    });
  }
}
