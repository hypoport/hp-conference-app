import { Injectable } from '@angular/core';
import { AgendaSlot } from '../../models/agenda';

/*
  Generated class for the AgendaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgendaService {
  

  constructor() { }
  
  public getMockedAgendaSlot(): AgendaSlot {
  	
  	const slot = new AgendaSlot();
    slot.title = "Agenda Slot";
    slot.start = Date.now();
    slot.duration = 60*60*1000;
    slot.subtitle = "Subtitle Agenda Slot";
    slot.speaker = "Speaker Name";
    
  	return slot;
  }
  

}
