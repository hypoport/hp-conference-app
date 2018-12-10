import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddConferencePage } from './add-conference';

@NgModule({
  declarations: [
    AddConferencePage,
  ],
  imports: [
    IonicPageModule.forChild(AddConferencePage),
  ],
})
export class AddConferencePageModule {}
