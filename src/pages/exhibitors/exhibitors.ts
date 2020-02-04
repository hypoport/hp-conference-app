import {Component, ViewChild, ElementRef} from '@angular/core';
import {ActionSheetButton, ActionSheetController, ActionSheetOptions, App, Config, Refresher, ToastController} from 'ionic-angular';

import {GlobalProvider} from "../../providers/global/global";
import {ExhibitorService} from "../../providers/exhibitor/exhibitor-service";
import {ConferenceService} from "../../providers/conference/conference-service";
import { BrowserService } from '../../providers/browser-service/browser-service';

import {Exhibitor} from "../../models/exhibitor";
import {AppPage} from "../../models/app-page";

import {ExhibitorPage} from '../exhibitor/exhibitor';

@Component({
  selector: 'page-exhibitors',
  templateUrl: 'exhibitors.html'
})
export class ExhibitorsPage {

  exhibitors: Array<Exhibitor> = [];

  appPage: AppPage;
  @ViewChild('appPageContent') appPageContent: ElementRef;

  constructor(private globalProvider: GlobalProvider,
    private exhibitorService: ExhibitorService,
    private conferenceService: ConferenceService,
    private toastCtrl: ToastController,
    private config: Config,
    private actionSheetCtrl: ActionSheetController,
    private browserService: BrowserService,
    private app: App,
    ) {
  }

  ionViewDidLoad() {
    this.conferenceService.getAppPage(this.globalProvider.conferenceId,'exhibitor').then((page) => {
      this.appPage = page;
      setTimeout(()=>{
        if(this.appPageContent) this.browserService.enableDynamicHyperlinks(this.appPageContent);        
      },200);
    },rejection => {
      console.log('AppPage Error: '+rejection);
    });

    this.exhibitorService.getExhibitors(this.globalProvider.conferenceId).then((exhibitors) => {
      this.exhibitors = exhibitors;
      this.exhibitorService.loadExhibitors(this.globalProvider.conferenceId,this.globalProvider.conferenceToken).then((exhibitors: Array<Exhibitor>) => {
        this.exhibitors = exhibitors;
      });
    });
  }
  ionViewDidEnter(){
    /*if(this.globalProvider.conferenceId){
      this.ga.trackView('conf/ep/'+this.globalProvider.conferenceId+'/speakers');
    } else {
      this.ga.trackView('speakersPage');
    }*/
  }

  public refreshExhibitors(refresher: Refresher) {
    this.exhibitorService.loadExhibitors(this.globalProvider.conferenceId,this.globalProvider.conferenceToken).then((exhibitors: Array<Exhibitor>) => {
      this.exhibitors = exhibitors;
      refresher.complete();
      const toast = this.toastCtrl.create({
        message: "Aussteller wurden aktualisiert",
        duration: 2000,
        position: "top"
      });
      toast.present();
    });
  }

  public goToExhibitorsPage(exhibitor) {
    this.app.getRootNav().push(ExhibitorPage, {exhibitor: exhibitor});
  }

}
