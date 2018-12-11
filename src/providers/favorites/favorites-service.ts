import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {Session} from "../../models/session";
import {Agenda} from "../../models/agenda";
import {NotificationService} from "../notifications/notifications-service";

const STORAGE_KEY = "favorites";

@Injectable()
export class FavoritesService {

  constructor(private storage: Storage,
    private notificationService: NotificationService) {
  }

  public toggleFavorite(conferenceId: string, session: Session): void {
    this.storage.get(STORAGE_KEY + conferenceId).then(favorites => {
      if (!favorites) {
        favorites = new Map();
      }
      if (favorites.get(session.id)) {
        favorites.delete(session.id);
        session.isFavorite = false;
        this.notificationService.removeNotification(conferenceId, session);
      }
      else {
        favorites.set(session.id, session);
        session.isFavorite = true;
        this.notificationService.triggerNotification(conferenceId, session);
      }
      console.log(favorites);
      this.storage.set(STORAGE_KEY + conferenceId, favorites);
    });
  }

  public loadFavorites(agenda: Agenda, conferenceId: string): Promise<Map<string, Session>> {
    console.log("load favorites");
    return this.storage.get(STORAGE_KEY + conferenceId).then((favorites: Map<string, Session>) => {
      if (favorites) {
        agenda.sessions.forEach(session => {
          session.isFavorite = favorites.has(session.id);
        });
      }
      return favorites;
    });
  }

  public rescheduleNotifications(agenda: Agenda, conferenceId: string) {
    console.log("reschedule notifications");
    this.notificationService.removeAllNotifictions(conferenceId);
    this.loadFavorites(agenda, conferenceId).then((favorites) => {
      if (favorites) {
        favorites.forEach((favorite) => this.notificationService.triggerNotification(conferenceId, favorite));
      }
    })
  }

}
