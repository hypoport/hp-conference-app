import {Component, ElementRef, ViewChild} from '@angular/core';
import {Conference} from '../../models/conference';
import {ConferenceService} from '../../providers/conference/conference-service';
import {GlobalProvider} from "../../providers/global/global";
import { ToastController, Refresher } from 'ionic-angular';

declare const google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  conference: Conference;
  
  lastUpdate: Date;
  
  constructor(private conferenceService: ConferenceService,
    private globalProvider: GlobalProvider,
    private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    this.conference = this.conferenceService.getConference(this.globalProvider.conferenceId);
    this.loadDirection();
  }
  ionViewDidEnter(){
	// silently update conference in background 
    if(!this.lastUpdate || this.lastUpdate.getTime() - new Date().getTime() > 1000*60){
	    this.lastUpdate = new Date();
	    setTimeout(()=>{
		  this.conferenceService.loadConference(this.globalProvider.conferenceId).then((conference: Conference) => {
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

  public refreshConference(refresher: Refresher) {
    this.conferenceService.loadConference(this.globalProvider.conferenceId).then((conference: Conference) => {
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
