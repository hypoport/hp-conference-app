import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalProvider} from "../../providers/global/global";
import {Storage} from "@ionic/storage";
import {Device} from '@ionic-native/device';
import {Exhibitor} from "../../models/exhibitor";

const STORAGE_KEY = "exhibitor";

@Injectable()
export class ExhibitorService {

  private exhibitors: Map<string, Array<Exhibitor>> = new Map<string, Array<Exhibitor>>();

  constructor(public http: HttpClient,
  			  private storage: Storage,
  			  private global: GlobalProvider,
  			  private device: Device
  			  ) {

  }

  public loadExhibitors(conferenceId: string, token: string): Promise<Array<Exhibitor>> {
    let url = this.global.apiURL('conference/exhibitors');
    return this.http.post(url, {
      "key": conferenceId,
      "token": token,
      "uuid": this.device.uuid
    }, {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).toPromise()
      .then((response: any) => {
	   	let exhibitors = response.data.exhibitors as Array<Exhibitor>;
	    this.exhibitors.set(conferenceId, exhibitors);
        this.storage.set(STORAGE_KEY, this.exhibitors);
        return exhibitors;
      });
  }

  public setExhibitors(conferenceId: string, exhibitors: Array<any>) {
  	  this.exhibitors.set(conferenceId, exhibitors);
      this.storage.set(STORAGE_KEY, this.exhibitors);
  }

  public getExhibitor(conferenceId: string, exhId: string): Promise<any> {
    return this.getAllExhibitors().then((exhibitors) => {
      if(!exhibitors.get(conferenceId)) return [];
      return exhibitors.get(conferenceId).find((value) => value.id == exhId);
    });
  }

  public getExhibitors(conferenceId: string): Promise<Array<any>> {
    return this.getAllExhibitors().then((exhibitors) => {
      if(!exhibitors.get(conferenceId)) return [];
      return exhibitors.get(conferenceId);
    });
  }

  public getAllExhibitors(): Promise<Map<string, Array<Exhibitor>>> {
    if (this.exhibitors.size == 0) {
      return this.storage.get(STORAGE_KEY).then((data) => {
        if (data && data.size > 0) {
          this.exhibitors = data;
        }
        return this.exhibitors
      });
    }
    return Promise.resolve(this.exhibitors);
  }

}
