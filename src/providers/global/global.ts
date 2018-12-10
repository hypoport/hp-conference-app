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
  private _appVersion: string;

  constructor() {
	  this._apiURL = 'http://wp.hypoport.local/wp-json/confsystem/v2';
	  this._appVersion = '0.1.0';
  }

  get conferenceId(): string {
    return this._conferenceId;
  }

  set conferenceId(value: string) {
    this._conferenceId = value;
  }

 public appVersion() {
    return this._appVersion;
  }


  public apiURL(endpoint: string){
	  return this._apiURL + '/' + endpoint;
  }

}
