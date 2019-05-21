import { Injectable } from '@angular/core';
import { ENV } from './../../../env.js';
import { ConferenceOptions } from "../../models/conference-options";

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  private _conferenceId: string;
  private _conferenceToken: string;
  private _conferenceBrand: string;
  private _conferenceOptions: ConferenceOptions;

  private _apiURL: string;
  private _gaKey: string;
  private _qrPayloadSecret: string;
  private _appVersion: string;

  constructor() {
	  this._apiURL = ENV.apiROOT;
    this._gaKey = ENV.gaKey;
	  this._qrPayloadSecret = ENV.qrPayloadSecret;
	  this._appVersion = '1.0.1 (3)';
  }

  get conferenceId(): string {
    return this._conferenceId;
  }

  set conferenceId(value: string) {
    this._conferenceId = value;
  }

  get conferenceToken(): string {
    return this._conferenceToken;
  }

  set conferenceToken(value: string) {
    this._conferenceToken = value;
  }

  get conferenceBrand(): string {
    return this._conferenceBrand;
  }

  set conferenceBrand(value: string) {
    this._conferenceBrand = value;
  }

  get conferenceOptions(): ConferenceOptions {
    return this._conferenceOptions;
  }

  set conferenceOptions(value: ConferenceOptions) {
    this._conferenceOptions = value;
  }

 public appVersion() {
    return this._appVersion;
  }
  public getGAKey() {
     return this._gaKey;
 }
 public apiURL(endpoint: string){
  let backendUrl = ENV.backendUrls[this._conferenceBrand];
  if(!backendUrl) backendUrl = ENV.backendUrls['hp'];
	return backendUrl + '/' + endpoint;
 }
 public rootApiUrl(){
   return this._apiURL;
 }
 public qrSecret(){
	return this._qrPayloadSecret;
 }
 public qrHotFix(url){
   if(ENV.hotFixUrls[url]){
     return ENV.hotFixUrls[url];
   } else {
     return url;
   }
 }

}
