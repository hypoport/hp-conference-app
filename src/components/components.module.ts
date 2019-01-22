import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SessionListComponent } from './session-list/session-list';

import { TrustByPass } from './../pipes/trust-bypass';
import { ParallaxHeader } from './../directives/parallax-header';

@NgModule({
	declarations: [
		SessionListComponent,
		ParallaxHeader,
		TrustByPass
	],
	imports: [IonicModule],
	exports: [
		SessionListComponent,
		ParallaxHeader,
		TrustByPass
	]
})
export class ComponentsModule {}
