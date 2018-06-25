import { Component, ViewChild, ElementRef } from '@angular/core';
import { Conference } from '../../models/conference';
import { ConferenceService } from '../../providers/conference/conference-service';

declare const google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  conference: Conference;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(private conferenceService: ConferenceService) {
    this.conference = conferenceService.getMockedConference();
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
