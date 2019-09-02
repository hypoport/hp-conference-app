import {Component} from '@angular/core';
import {ActionSheetButton, ActionSheetController, ActionSheetOptions, App, Config, Refresher, ToastController} from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {ExhibitorService} from "../../providers/exhibitor/exhibitor-service";
import {Exhibitor} from "../../models/exhibitor";
import {ExhibitorPage} from '../exhibitor/exhibitor';

@Component({
  selector: 'page-exhibitors',
  templateUrl: 'exhibitors.html'
})
export class ExhibitorsPage {

  exhibitors: Array<Exhibitor> = [];

  constructor(private globalProvider: GlobalProvider,
    private exhibitorService: ExhibitorService,
    private toastCtrl: ToastController,
    private config: Config,
    private actionSheetCtrl: ActionSheetController,
    private app: App,
    ) {
      let exh1 = new Exhibitor;
      exh1.title = "Test Exhibitor - super tolle Leistung die wir bieten für so krasse Branchen";
      exh1.company = "FINMAS GmbH – Mitarbeiter Nachname und Mitarbeiterin Nachname";
      exh1.url = "https://finmas.de";
      exh1.email = "info@finmas.de";
      exh1.phone = "1234 1234 1234";
      exh1.address = "FINMAS GmbH<br/>Klosterstraße 72<br/>10749 Berlin";
      //exh1.headerImg = "https://www.tagung.finmas.de/finmas/uploads/2019/06/fm_tagung-2019_app.png";
      exh1.logoImg = "https://finmas.de/finmas-relaunch/uploads/base_content/logo.png";

      exh1.description = "Für jede Aufgabe die richtigen Experten.\n";
      exh1.description += "Mit ca 250 Mitarbeitern an acht Standorten ist die VALUE AG hierzulande eine der größten, bankenunabhängigen Immobilienbewertungsgesellschaften. Mit jahrzehntelanger Branchenerfahrung, hoch qualifizierten MitarbeiterInnen, regionaler Marktkenntnis und intelligenten Prozessen helfen wir Menschen und Institutionen, ihre Immobilie und deren Wert besser einzuschätzen.\n";
      exh1.description += "\n";
      exh1.description += "Wir bieten:\n";
      exh1.description += "- Immobilienbesichtigungen inklusive Dokumentation\n";
      exh1.description += "- Markt- und Beleihungswertgutachten innerhalb und oberhalb der Kleindarlehensgrenze\n";
      exh1.description += "- Portfoliobewertungen\n";
      exh1.description += "- Vollständige Übernahme des Bewertungsprozesses bei Auslagerung der Bewertungsleistung durch die Auftraggeber\n";
      exh1.description += "\n";
      exh1.description += "Du möchtest mehr über uns erfahren? www.value.ag\n";

      // fake exhibitors
      this.exhibitors = [
        exh1
    ];
  }

  ionViewDidLoad() {
    /*this.exhibitorService.getExhibitors(this.globalProvider.conferenceId).then((exhibitors) => {
      this.exhibitors = exhibitors;
    });*/
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
