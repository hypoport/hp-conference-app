import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SessionListComponent } from './session-list/session-list';

import { TrustByPass } from './../pipes/trust-bypass';
import { NicerDay } from './../pipes/nicer-day';
import { NicerUrl } from './../pipes/nicer-url';
import { ParallaxHeader } from './../directives/parallax-header';

@NgModule({
	declarations: [
		SessionListComponent,
		ParallaxHeader,
		TrustByPass,
		NicerDay,
		NicerUrl
	],
	imports: [IonicModule],
	exports: [
		SessionListComponent,
		ParallaxHeader,
		TrustByPass,
		NicerDay,
		NicerUrl
	]
})
export class ComponentsModule {}
