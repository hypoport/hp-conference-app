import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, Refresher, ToastController, ActionSheetController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {AddConferencePage} from '../add-conference/add-conference';

import {GlobalProvider} from '../../providers/global/global';
import {ConferenceService} from "../../providers/conference/conference-service";
import {Conference} from '../../models/conference';
import {ConferenceOptions} from '../../models/conference-options';

import {BrandProvider} from '../../providers/brand/brand';
import {SettingsPage} from '../settings/settings';

import {BleService} from '../../providers/ble-service/ble-service';


/**
 * Generated class for the OverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {

  currentConference: Conference;
  lastConferences = new Array<Conference>();
  nextConferences = new Array<Conference>();

  constructor(private navCtrl: NavController,
    private globalProvider: GlobalProvider,
    private conferenceService: ConferenceService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private brandProvider: BrandProvider,
    private actSheetCtrl: ActionSheetController,
    private bleService: BleService
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverviewPage');
  }

  ionViewWillEnter() {
    this.loadConferences().then(() => console.log("conferences loaded"));

    /*
    if(this.globalProvider.conferenceId){
      this.ga.trackView('conf/ep/'+this.globalProvider.conferenceId+'/overview');
    } else {
      this.ga.trackView('overviewPage');
    }*/

  }

  public goToConference(newConferenceId: string, newToken: string, newBrand: string, conferenceopt: ConferenceOptions) {
    this.globalProvider.conferenceId = newConferenceId;
    this.globalProvider.conferenceToken = newToken;
    this.globalProvider.conferenceBrand = newBrand;
    this.globalProvider.conferenceOptions = conferenceopt;
    this.brandProvider.switchBrandTheme(this.globalProvider.conferenceBrand);
    this.navCtrl.push(TabsPage);
  }

  presentAddConferenceModal() {
    let addModal = this.modalCtrl.create(AddConferencePage, {});
    addModal.present();
  }

  private sortByStartDate(conferences: Array<Conference>): void {
    conferences.sort((a: Conference, b: Conference) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    })
  }

  private sortByEndDate(conferences: Array<Conference>): void {
    conferences.sort((a: Conference, b: Conference) => {
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    })
  }

  private loadConferences(): Promise<void> {
    let today = new Date();
    this.nextConferences.length = 0;
    this.lastConferences.length = 0;
    return this.conferenceService.getAllConferences().then((conferences) => {
      if (conferences) {
        conferences.forEach(conference => {
          if (new Date(conference.endDate).getTime() < today.getTime()) {
            this.lastConferences.push(conference);
          }
          else if (new Date(conference.startDate).getTime() > today.getTime() || new Date(conference.endDate).getTime() >= today.getTime() ) {
            this.nextConferences.push(conference);
          } else {
            this.lastConferences.push(conference);
          }
        });
        this.sortByStartDate(this.nextConferences);
        this.sortByEndDate(this.lastConferences);
        if (this.nextConferences.length > 0) {
          this.currentConference = this.nextConferences.pop();
        }
        else {
           this.currentConference = this.lastConferences.pop();
        }

      }
      return Promise.resolve();
    });
  }

  public refreshConferences(refresher: Refresher) {
    this.loadConferences().then(() => {
      refresher.complete();
      const toast = this.toastCtrl.create({
        message: "Tagungen wurden aktualisiert",
        duration: 2000,
        position: "top"
      });
      toast.present();
    });
  }

  public getLogo(brand: string): string {
    return this.brandProvider.getLogoUrl(brand);
  }

  public openActionSheetForConferences(newConferenceId: string){
	  let actionSheet = this.actSheetCtrl.create({
	     title: 'Tagung',
	     buttons: [
	       {
	         text: 'Aktualisieren',
	         handler: () => {
			 	this.loadConferences().then(() => {
			      const toast = this.toastCtrl.create({
			        message: "Tagungen wurden aktualisiert",
			        duration: 2000,
			        position: "top"
			      });
			      toast.present();
			    });
	         }
	       },
	       {
	         text: 'Entfernen',
	         role: 'destructive',
	         handler: () => {
			 	this.conferenceService.removeConference(newConferenceId).then(()=>{
				  this.loadConferences().then(() => {
					  const toast = this.toastCtrl.create({
				        message: "Tagung wurde entfernt",
				        duration: 2000,
				        position: "top"
				      });
				      toast.present();
				  });
			 	});
	         }
	       },
	       {
	         text: 'Abbrechen',
	         role: 'cancel',
	         handler: () => {
	         }
	       }
	     ]
	   });

	   actionSheet.present();
  }

  public openSettingsPage(){
	  this.navCtrl.push(SettingsPage);
  }

}
