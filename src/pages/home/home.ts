import {Component,  ViewChild, ElementRef } from '@angular/core';
import {Conference} from '../../models/conference';
import {ConferenceService} from '../../providers/conference/conference-service';
import {GlobalProvider} from "../../providers/global/global";

declare const google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  conference: Conference;

  constructor(private conferenceService: ConferenceService, private globalProvider: GlobalProvider) {
    conferenceService.getConference(globalProvider.conferenceId).then((result) => this.conference = result);
  }

  ionViewDidLoad() {
    let location = { lat: this.conference.directions.location.latitude, lng: this.conference.directions.location.longitude }
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: location,
      mapTypeId: 'roadmap'
    });
    this.map.setCenter(location);
    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
  }
}
