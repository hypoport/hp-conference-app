import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, App } from 'ionic-angular';
import { AgendaService } from '../../providers/agenda/agenda-service';
import { GlobalProvider } from "../../providers/global/global";
import { Session } from "../../models/session";
import { SessionCategory } from "../../models/session-category";
import {Events} from "ionic-angular";

/**
 * Generated class for the HomePopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agenda-popover',
  templateUrl: 'agenda-popover.html',
})
export class AgendaPopoverPage {

  availableFilter: Array<SessionCategory> = [];
  availableRooms: Array<string> = [];

  constructor(private agendaService: AgendaService,
              private navParams: NavParams,
              private globalProvider: GlobalProvider,
              private events: Events) {

  }

  ngOnInit(){
    console.log(this.globalProvider.conferenceOptions);
    this.agendaService.getAgenda(this.globalProvider.conferenceId).then((agenda) => {
        this.availableFilter = [];
        this.availableRooms = [];
        let sessions = agenda.sessions;
        if(sessions){
          sessions.forEach( (session) => {
            // add categories
            if(session.category){
              session.category.forEach( (category) => {
                let found = false;
                this.availableFilter.forEach( (knownCategory) => {
                  console.log(category.name);
                  if(category.name == knownCategory.name){
                    found = true;
                  }
                });
                if(!found) this.availableFilter.push(category);
              });
            }
            // add rooms
            if(session.location && this.availableRooms.indexOf(session.location) == -1) this.availableRooms.push(session.location);
          });
        }
    });

    /*
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.textEle = this.navParams.data.textEle;
    }*/
  }

  updateFilter(newFilter){
    this.globalProvider.toggleAgendaFilter(newFilter);
    this.events.publish('session:filter', newFilter);
  }

  convertToBorderColor(hex: string){
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var saturate = 1.02;

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var rgb = result ? {
      r: Math.min(Math.round(parseInt(result[1], 16)*saturate),255),
      g: Math.min(Math.round(parseInt(result[2], 16)*saturate),255),
      b: Math.min(Math.round(parseInt(result[3], 16)*saturate),255)
    } : null;

    var lighten = 0.45;
    var r = Math.round((1 - (1 - rgb.r / 255) * (1 - (255*lighten) / 255)) * 255);
    var g = Math.round((1 - (1 - rgb.g / 255) * (1 - (255*lighten) / 255)) * 255);
    var b = Math.round((1 - (1 - rgb.b / 255) * (1 - (255*lighten) / 255)) * 255);

    return 'rgba('+r+','+g+','+b+',1)'
  }

  convertToBgColor(hex: string){
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var saturate = 1.07;

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var rgb = result ? {
      r: Math.min(Math.round(parseInt(result[1], 16)*saturate),255),
      g: Math.min(Math.round(parseInt(result[2], 16)*saturate),255),
      b: Math.min(Math.round(parseInt(result[3], 16)*saturate),255)
    } : null;

    var lighten = 0.85;
    var r = Math.round((1 - (1 - rgb.r / 255) * (1 - (255*lighten) / 255)) * 255);
    var g = Math.round((1 - (1 - rgb.g / 255) * (1 - (255*lighten) / 255)) * 255);
    var b = Math.round((1 - (1 - rgb.b / 255) * (1 - (255*lighten) / 255)) * 255);

    return 'rgba('+r+','+g+','+b+',1)'
  }
}
