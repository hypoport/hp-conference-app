import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendeesPage } from './attendees';

@NgModule({
  declarations: [
    AttendeesPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendeesPage),
  ],
})
export class AttendeesPageModule {}
