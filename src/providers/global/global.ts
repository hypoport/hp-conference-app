import { Injectable } from '@angular/core';
import { ENV } from './../../../env.js';
/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  private _conferenceId: string;

  private _apiURL: string;
  private _qrPayloadSecret: string;
  private _appVersion: string;

  constructor() {
	  this._apiURL = ENV.apiROOT;
	  this._qrPayloadSecret = ENV.qrPayloadSecret;
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
 public qrSecret(){
	return this._qrPayloadSecret;
 }

}
