import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaPopoverPage } from './agenda-popover';

@NgModule({
  declarations: [
    AgendaPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaPopoverPage),
  ],
})
export class AgendaPopoverPageModule {}
