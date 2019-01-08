import {Component} from '@angular/core';
import {IonicPage, NavParams, NavController} from 'ionic-angular';
import {Session} from '../../models/session';
import {SpeakerService} from '../../providers/speaker/speaker-service';
import {GlobalProvider} from '../../providers/global/global';
import {Speaker} from '../../models/speaker';
import {SpeakerPage} from '../speaker/speaker';
import {FavoritesService} from "../../providers/favorites/favorites-service";

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
    private navCtrl: NavController,
    private speakerService: SpeakerService,
    private globalProvider: GlobalProvider,
    private favoritesService: FavoritesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionPage');
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter SessionPage");
    this.session = this.navParams.get('session');
    console.log("session passed: " + this.session);
    this.speakers.length = 0;
    if (this.session.speakers) {
      this.session.speakers.forEach((speakerId) => {
        this.speakerService.getSpeaker(this.globalProvider.conferenceId, speakerId).then((speaker) => {
          this.speakers.push(speaker);
        });
      });
    }
  }

  public toggleFavorite() {
    this.favoritesService.toggleFavorite(this.globalProvider.conferenceId, this.session);
  }

  public goToSpeakerPage(speaker) {
    this.navCtrl.push(SpeakerPage, {speaker: speaker});
  }


}
