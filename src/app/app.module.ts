import {ErrorHandler, NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {AgendaPage} from '../pages/agenda/agenda';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {OverviewPage} from '../pages/overview/overview';
import {AddConferencePage} from '../pages/add-conference/add-conference';
import {SessionPage} from '../pages/session/session';
import {SessionFeedbackPage} from '../pages/session-feedback/session-feedback';
import {SpeakersPage} from '../pages/speakers/speakers';
import {SpeakerPage} from '../pages/speaker/speaker';
import {SettingsPage} from '../pages/settings/settings';
import {HomePopoverPage} from '../pages/home-popover/home-popover';
import {AgendaPopoverPage} from '../pages/agenda-popover/agenda-popover';
import {ExhibitorsPage} from '../pages/exhibitors/exhibitors';
import {ExhibitorPage} from '../pages/exhibitor/exhibitor';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AgendaService} from '../providers/agenda/agenda-service';
import {GlobalProvider} from '../providers/global/global';
import {ConferenceService} from '../providers/conference/conference-service';
import {BrandProvider} from '../providers/brand/brand';
import {SpeakerService} from '../providers/speaker/speaker-service';
import {ExhibitorService} from '../providers/exhibitor/exhibitor-service';
import {FavoritesService} from '../providers/favorites/favorites-service';
import {NotificationService} from '../providers/notifications/notifications-service';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {Device} from '@ionic-native/device';
import { CallNumber } from '@ionic-native/call-number';

import {ComponentsModule} from "../components/components.module";

import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';

import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {LocalNotifications} from '@ionic-native/local-notifications';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    MyApp,
    SpeakersPage,
    AgendaPage,
    HomePage,
    TabsPage,
    OverviewPage,
    AddConferencePage,
    SessionPage,
    SessionFeedbackPage,
    SpeakerPage,
    ExhibitorsPage,
    ExhibitorPage,
    SettingsPage,
    HomePopoverPage,
    AgendaPopoverPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: 'de.hypoport.conferences',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(MyApp),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SpeakersPage,
    AgendaPage,
    HomePage,
    TabsPage,
    OverviewPage,
    AddConferencePage,
    SessionPage,
    SessionFeedbackPage,
    SpeakerPage,
    SettingsPage,
    HomePopoverPage,
    AgendaPopoverPage
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "de" },
    StatusBar,
    BarcodeScanner,
    LocalNotifications,
    Device,
    SplashScreen,
    InAppBrowser,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AgendaService,
    ConferenceService,
    GlobalProvider,
    SpeakerService,
    ExhibitorService,
    BrandProvider,
    FavoritesService,
    NotificationService
  ]
})
export class AppModule {}
