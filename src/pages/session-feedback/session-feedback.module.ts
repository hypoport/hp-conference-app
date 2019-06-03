import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SessionFeedbackPage } from './session-feedback';

@NgModule({
  declarations: [
    SessionFeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(SessionFeedbackPage),
  ],
})
export class SessionFeedbackPageModule {}
