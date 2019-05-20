import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SessionListComponent } from './session-list/session-list';

import { TrustByPass } from './../pipes/trust-bypass';
import { NicerDay } from './../pipes/nicer-day';
import { ParallaxHeader } from './../directives/parallax-header';

@NgModule({
	declarations: [
		SessionListComponent,
		ParallaxHeader,
		TrustByPass,
		NicerDay
	],
	imports: [IonicModule],
	exports: [
		SessionListComponent,
		ParallaxHeader,
		TrustByPass,
		NicerDay
	]
})
export class ComponentsModule {}
