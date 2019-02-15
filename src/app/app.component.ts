import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OverviewPage } from '../pages/overview/overview';
import { GlobalProvider } from '../providers/global/global';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = OverviewPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, globalProdiver: GlobalProvider,private ga: GoogleAnalytics) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // load GA
      ga.startTrackerWithId(globalProdiver.getGAKey())
       .then(() => {
           console.log('Google analytics is ready now');
           ga.setAnonymizeIp(true);
           ga.setAppVersion(globalProdiver.appVersion());
         })
         .catch(e => console.log('Error starting GoogleAnalytics', e));

    });
  }
}
