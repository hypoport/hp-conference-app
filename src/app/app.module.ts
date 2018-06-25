import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {AgendaPage} from '../pages/agenda/agenda';
import {SpeakersPage} from '../pages/speakers/speakers';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {OverviewPage} from '../pages/overview/overview';
import {AddConferencePage} from '../pages/add-conference/add-conference';


import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AgendaService} from '../providers/agenda/agenda-service';
import {GlobalProvider} from '../providers/global/global';
import {ConferenceService} from '../providers/conference/conference-service';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    SpeakersPage,
    AgendaPage,
    HomePage,
    TabsPage,
    OverviewPage,
    AddConferencePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SpeakersPage,
    AgendaPage,
    HomePage,
    TabsPage,
    OverviewPage,
    AddConferencePage
  ],
  providers: [
    StatusBar,
    SplashScreen, {provide: ErrorHandler, useClass: IonicErrorHandler},
    AgendaService,
    ConferenceService,
    GlobalProvider
  ]
})
export class AppModule {}
