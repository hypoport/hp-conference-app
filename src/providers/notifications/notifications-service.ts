import {Injectable} from '@angular/core';
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Session} from "../../models/session";
import {Storage} from "@ionic/storage";

const STORAGE_KEY = "notifications";

@Injectable()
export class NotificationService {

  constructor(private storage: Storage,
    private localNotifications: LocalNotifications) {
	    localNotifications.cancelAll();
  }

  public triggerNotification(conferenceId: string, session: Session) {
    console.log("trigger notification for session", session);
    this.storage.get(STORAGE_KEY).then((notifications) => {
      let conferenceNotification;
      if (!notifications) {
        notifications = new Map();
      }
      conferenceNotification = notifications.get(conferenceId);
      if (!conferenceNotification) {
        conferenceNotification = new Map();
        notifications.set(conferenceId, conferenceNotification)
      }
      let notification = this.getNotification(notifications, session);
      if (!notification) {
        return
      }
      console.log("trigger", notification);
      this.localNotifications.schedule(<any>notification);
      conferenceNotification.set(session.id, notification.id);
      this.storage.set(STORAGE_KEY, notifications);
    });
  }

  public removeAllNotifictions(conferenceId: string) {
    console.log("remove all notifications");
    this.storage.get(STORAGE_KEY).then((notifications: Map<string, Map<string, number>>) => {
      if (!notifications) {
        return
      }
      const conferenceNotification: Map<string, number> = notifications.get(conferenceId);
      if (conferenceNotification) {
        conferenceNotification.forEach((sessionId, notificationId) => {
          this.localNotifications.cancel(notificationId);
        });
        notifications.delete(conferenceId);
        this.storage.set(STORAGE_KEY, notifications);
      }
    });
  }

  public removeNotification(conferenceId: string, session: Session) {
    console.log("remove notification");
    this.storage.get(STORAGE_KEY).then((notifications: Map<string, Map<string, number>>) => {
      if(notifications && notifications.get(conferenceId)){
        const notificationId = notifications.get(conferenceId).get(session.id);
        console.log("cancel notification " + notificationId);
        this.localNotifications.cancel(notificationId);
        notifications.get(conferenceId).delete(session.id);
        this.storage.set(STORAGE_KEY, notifications);
      }
    });
  }

  private getNotification(notifications: Map<string, Map<string, number>>, session: Session) {

  let currDate = new Date().getTime();
	let startDate  = new Date(session.timeStart).getTime();

	// @ts-ignore
	let minutesUntil = ( ((startDate - currDate) / 60000)) - 5;
  minutesUntil = Math.round(minutesUntil);
  console.log('now:'+new Date().getTime());
  console.log('then:'+new Date(session.timeStart).getTime());

	console.log('notification '+session.title+' send in '+minutesUntil);
	if(minutesUntil < 5){
		return null;
	}

    return {
      id: this.getMaxId(notifications) + 1,
      text: `${session.title} beginnt in 5 Minuten`,
      trigger: {in: minutesUntil, unit: 'minute'}
    };
  }

  private getMaxId(notifications: Map<string, Map<string, number>>) {
    const mapped = Array.from(notifications.values()).map((entry: Map<string, number>) => {
      return Math.max(0, ...Array.from(entry.values()));
    });
    return Math.max(0, ...mapped);
  }

}
