import { Injectable } from '@angular/core';
import { ENV } from './../../../env.js';
import { ConferenceOptions } from "../../models/conference-options";
import { SessionCategory } from "../../models/session-category";

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

  public activeFilters: Array<string>;

  constructor() {
	  this._apiURL = ENV.apiROOT;
    this._gaKey = ENV.gaKey;
	  this._qrPayloadSecret = ENV.qrPayloadSecret;
	  this._appVersion = '1.0.4 (1)';
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
 /*
    Tracking and Versioning
 */
 public appVersion() {
    return this._appVersion;
  }
  public getGAKey() {
     return this._gaKey;
 }
 /*
    API Url and Backend Switcher
 */
 public apiURL(endpoint: string){
  let backendUrl = ENV.backendUrls[this._conferenceBrand];
  if(!backendUrl) backendUrl = ENV.backendUrls['hp'];
	return backendUrl + '/' + endpoint;
 }
 public rootApiUrl(){
   return this._apiURL;
 }
 /*
    Custom Labels for InApp Texts
 */
 public getLabel(labelIndex: string){
   if(this._conferenceOptions && this._conferenceOptions.labels && this._conferenceOptions.labels[labelIndex]){
     return this._conferenceOptions.labels[labelIndex];
   } else {
     return false;
   }
 }
 /*
    QR-Code Functionalities
 */
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
 /*
    Agenda Filter
 */
 public addAgendaFilter(filter: string){
   if(this.activeFilters.indexOf(filter) == -1){
     this.activeFilters.push(filter);
   }
   return this.activeFilters;
 }
 public removeAgendaFilter(filter: string){
   for(let i = 0; i < this.activeFilters.length; i++){
     if(this.activeFilters[i] == filter) this.activeFilters.splice(i,1);
   }
   return this.activeFilters;
 }

}
