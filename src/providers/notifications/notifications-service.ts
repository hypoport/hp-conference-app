import {Injectable} from '@angular/core';
import {LocalNotifications} from "@ionic-native/local-notifications";

/*
  Generated class for the NotificationService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationService {

  constructor(private localNotifications: LocalNotifications) {
    const triggered = new Date(new Date().getTime() + 1000);
    console.log("notification triggered", triggered);
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      trigger: {at: triggered},
      led: 'FF0000',
      sound: null
    });
  }

}
