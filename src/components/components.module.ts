import { NgModule } from '@angular/core';
import { AgendaListComponent } from './agenda-list/agenda-list';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [AgendaListComponent],
	imports: [IonicModule],
	exports: [AgendaListComponent]
})
export class ComponentsModule {}
