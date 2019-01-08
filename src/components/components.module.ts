import { NgModule } from '@angular/core';
import { SessionListComponent } from './session-list/session-list';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [
		SessionListComponent
	],
	imports: [IonicModule],
	exports: [
		SessionListComponent
	]
})
export class ComponentsModule {}
