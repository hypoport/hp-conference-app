import {Component,ViewChild,ElementRef} from '@angular/core';
import {ActionSheetButton, ActionSheetController, ActionSheetOptions, App, Config, Refresher, ToastController, NavParams} from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {ExhibitorService} from "../../providers/exhibitor/exhibitor-service";
import {Exhibitor} from "../../models/exhibitor";
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserService } from '../../providers/browser-service/browser-service';

@Component({
  selector: 'page-exhibitor',
  templateUrl: 'exhibitor.html'
})
export class ExhibitorPage {

  exhibitor: Exhibitor;
  @ViewChild('desc') desc: ElementRef;

  constructor(private globalProvider: GlobalProvider,
    private exhibitorService: ExhibitorService,
    private toastCtrl: ToastController,
    private config: Config,
    private actionSheetCtrl: ActionSheetController,
    public navParams: NavParams,
    private app: App,
    private iab: InAppBrowser,
    private callNumber: CallNumber,
    private browserService: BrowserService,
    ) {
      this.exhibitor = navParams.get('exhibitor');
  }

  ionViewDidLoad(){
    this.browserService.enableDynamicHyperlinks(this.desc);
  }

  ionViewDidEnter(){
    /*if(this.globalProvider.conferenceId){
      this.ga.trackView('conf/ep/'+this.globalProvider.conferenceId+'/speakers');
    } else {
      this.ga.trackView('speakersPage');
    }*/
  }

  public openBrowser(url){
    if(url){
      if(url != "") this.iab.create(url,'_system',{location:'no'});
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


}
