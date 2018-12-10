import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {Session} from "../../models/session";
import {Agenda} from "../../models/agenda";

const STORAGE_KEY = "favorites";

@Injectable()
export class FavoritesService {

  constructor(private storage: Storage) {
  }

  public toggleFavorite(conferenceId: string, session: Session): void {
    this.storage.get(STORAGE_KEY + conferenceId).then(favorites => {
      if (!favorites) {
        favorites = new Map();
      }
      if (favorites.get(session.id)) {
        favorites.delete(session.id);
        session.isFavorite = false;
      }
      else {
        favorites.set(session.id, session);
        session.isFavorite = true;
      }
      console.log(favorites);
      this.storage.set(STORAGE_KEY + conferenceId, favorites);
    });
  }

  public loadFavorites(agenda: Agenda, conferenceId: string): Promise<Map<string, Session>> {
    console.log("load favorites");
    return this.storage.get(STORAGE_KEY + conferenceId).then((favorites: Map<string, Session>) => {
      agenda.sessions.forEach(session => {
        session.isFavorite = favorites.has(session.id);
      });
      return favorites;
    });
  }

}
