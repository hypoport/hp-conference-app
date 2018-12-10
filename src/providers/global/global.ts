import {Injectable} from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  private _conferenceId: string;

  private _apiURL: string;

  constructor() {
	  this._apiURL = 'https://wp.hypoport.local/wp-json/confsystem/v2';
  }

  get conferenceId(): string {
    return this._conferenceId;
  }

  set conferenceId(value: string) {
    this._conferenceId = value;
  }

  public apiURL(endpoint: string){
	  return this._apiURL + '/' + endpoint;
  }

}
