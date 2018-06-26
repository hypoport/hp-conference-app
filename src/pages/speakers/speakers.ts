import {Component} from '@angular/core';
import {ActionSheetButton, ActionSheetController, ActionSheetOptions, Config, Refresher, ToastController} from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {SpeakerService} from "../../providers/speaker/speaker-service";
import {Speaker} from "../../models/speaker";

@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html'
})
export class SpeakersPage {

  speakers: Array<Speaker> = [];

  constructor(private globalProvider: GlobalProvider,
    private speakerService: SpeakerService,
    private toastCtrl: ToastController,
    private config: Config,
    private actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    this.speakerService.getSpeakers(this.globalProvider.conferenceId).then((speakers) => {
      this.speakers = speakers;
    });
  }

  public refreshSpeakers(refresher: Refresher) {
    this.speakerService.loadSpeakers(this.globalProvider.conferenceId).then((speakers: Array<Speaker>) => {
      this.speakers = speakers;
      refresher.complete();
      const toast = this.toastCtrl.create({
        message: "Speaker wurden aktualisiert",
        duration: 3000
      });
      toast.present();
    });
  }

  openContact(speaker: Speaker) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        } as ActionSheetButton,
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }

}
