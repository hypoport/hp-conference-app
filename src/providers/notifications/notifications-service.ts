import {Injectable} from '@angular/core';
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Session} from "../../models/session";
import {Agenda} from "../../models/agenda";
import {Storage} from "@ionic/storage";
import {GlobalProvider} from "../global/global";

const STORAGE_KEY = "notifications";

@Injectable()
export class NotificationService {

  constructor(private storage: Storage,
    private localNotifications: LocalNotifications,
    public globalProvider: GlobalProvider
  ) {
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
        this.localNotifications.cancelAll();
        return
      }
      const conferenceNotification: Map<string, number> = notifications.get(conferenceId);
      if (conferenceNotification) {
        conferenceNotification.forEach((sessionId, notificationId) => {
          if(notificationId) this.localNotifications.cancel(notificationId);
        });
        notifications.delete(conferenceId);
        this.storage.set(STORAGE_KEY, notifications);
      }
      this.localNotifications.cancelAll();
    });
  }
  /*
    ATTENTION: notificationId seems in some cases not exists, causing double notifications. Better remove all and reschedule all
    TODO: CUT CANDIDATE
  */
  public removeNotification(conferenceId: string, session: Session) {
    console.log("remove notification");
    this.storage.get(STORAGE_KEY).then((notifications: Map<string, Map<string, number>>) => {
      if(notifications && notifications.get(conferenceId)){
        const notificationId = notifications.get(conferenceId).get(session.id);
        console.log("cancel notification " + notificationId);
        if(notificationId) this.localNotifications.cancel(notificationId);
        notifications.get(conferenceId).delete(session.id);
        this.storage.set(STORAGE_KEY, notifications);
      }
    });
  }

  private getNotification(notifications: Map<string, Map<string, number>>, session: Session) {

  let now = new Date();
  let currDate = new Date().getTime();
	let startDate  = new Date(session.timeStart).getTime();
	// @ts-ignore
	let minutesUntil = (( ((startDate - currDate) / 60000)) - 5) + now.getTimezoneOffset();
  minutesUntil = Math.round(minutesUntil);
  console.log(new Date(currDate).toISOString());
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

  public rescheduleNotifications(agenda: Agenda,conferenceId: string) {
    console.log("reschedule notifications");
      let confOptions = this.globalProvider.conferenceOptions;
      if(confOptions && confOptions.noNotifications){
        console.log('no notifications active. Stop sending notifications');
        this.removeAllNotifictions(conferenceId.toString());
      } else {
        this.removeAllNotifictions(conferenceId);
        if (agenda && agenda.sessions) {
            let favoSessions = agenda.sessions.filter((session) => session.isFavorite);
            console.log('favo test');
            console.log(favoSessions);
            favoSessions.forEach((session) => this.triggerNotification(conferenceId, session));
        }
      }
  }


  private getMaxId(notifications: Map<string, Map<string, number>>) {
    const mapped = Array.from(notifications.values()).map((entry: Map<string, number>) => {
      return Math.max(0, ...Array.from(entry.values()));
    });
    return Math.max(0, ...mapped);
  }

}
