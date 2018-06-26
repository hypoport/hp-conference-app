import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Session } from '../../models/session';
import { SpeakerService } from '../../providers/speaker/speaker-service';
import { GlobalProvider } from '../../providers/global/global';
import { Speaker } from '../../models/speaker';

/**
 * Generated class for the SessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-session',
  templateUrl: 'session.html',
})
export class SessionPage {

  session: Session;
  speakers = new Array<Speaker>();

  constructor(private navParams: NavParams,
    private speakerService: SpeakerService,
    private globalProvider: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionPage');
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter SessionPage");
    this.session = this.navParams.get('session');
    console.log("session passed: " + this.session);
    this.speakers.length = 0;
    this.session.speakers.forEach( (speakerId) => {
      this.speakerService.getSpeaker(this.globalProvider.conferenceId, speakerId).then((speaker) => {
        this.speakers.push(speaker);
      });
    });
  }
}
