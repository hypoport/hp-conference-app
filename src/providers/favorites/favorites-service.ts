import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {Session} from "../../models/session";
import {Agenda} from "../../models/agenda";
import {NotificationService} from "../notifications/notifications-service";
import {GlobalProvider} from "../global/global";
import {Events} from "ionic-angular";

const STORAGE_KEY = "favorites";

@Injectable()
export class FavoritesService {

  constructor(private storage: Storage,
    private notificationService: NotificationService,
    private globalProvider: GlobalProvider,
    private events: Events) {
  }

  public toggleFavorite(conferenceId: string, session: Session): void {
    this.storage.get(STORAGE_KEY + conferenceId).then(favorites => {
      if (!favorites) {
        favorites = new Map();
      }
      if (favorites.get(session.id)) {
        favorites.delete(session.id);
        session.isFavorite = false;
        this.notificationService.removeAllNotifictions(conferenceId);
        this.events.publish('session:favorite', session, session.isFavorite, Date.now());
      }
      else {
        favorites.set(session.id, session);
        session.isFavorite = true;
        this.notificationService.removeAllNotifictions(conferenceId);
        this.events.publish('session:favorite', session, session.isFavorite, Date.now());
      }
      this.storage.set(STORAGE_KEY + conferenceId, favorites);
    });
  }

  public loadFavorites(agenda: Agenda, conferenceId: string): Promise<Map<string, Session>> {
    console.log("load favorites");
    // @ts-ignore
    return this.storage.get(STORAGE_KEY + conferenceId).then((favorites: Map<string, Session>) => {
      let favoriteSessions = [];
      if (favorites) {
        agenda.sessions.forEach(session => {
          session.isFavorite = favorites.has(session.id);
          if(session.isFavorite){
            favoriteSessions.push(session);
          }
        });
      }
      return favoriteSessions;
    });
  }

  public rescheduleNotifications(agenda: Agenda, conferenceId: string) {
    this.notificationService.rescheduleNotifications(agenda,conferenceId);
  }

  public removeAllNotifictions(conferenceId: string){
    console.log("remove all notifications");
    this.notificationService.removeAllNotifictions(conferenceId);
  }

}
