import { Injectable, Inject } from '@angular/core';
import { ENV } from './../../../env.js';
import { DOCUMENT } from '@angular/common';
import {ConferenceOptions} from "../../models/conference-options";

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  private _conferenceId: string;
  private _conferenceToken: string;
  private _conferenceOptions: ConferenceOptions;

  private _apiURL: string;
  private _gaKey: string;
  private _qrPayloadSecret: string;
  private _appVersion: string;

  constructor(@Inject(DOCUMENT) document) {
	  this._apiURL = ENV.apiROOT;
    this._gaKey = ENV.gaKey;
	  this._qrPayloadSecret = ENV.qrPayloadSecret;
	  this._appVersion = '1.0.1 (1)';

    this.switchBrandTheme('gp');


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
	return this._apiURL + '/' + endpoint;
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
public switchBrandTheme(brand: string){
  brand = brand.toString().toLowerCase();
  let links = document.getElementsByTagName('link');

  if(ENV.skipBranding){
    console.warn('SKIPPED BRANDING: Fallback to default Style-Theme.');
    return false;
  }
  console.log('LOAD BRANDING: '+brand);
  for(let i = 0; i < links.length; i++){
      let ele = links[i];
      if(ele.getAttribute('rel') == 'stylesheet'){
        if(ele.getAttribute('href').indexOf('build/') !== -1){
          var newStyling = document.createElement("link");
          newStyling.setAttribute('rel','stylesheet');
          newStyling.setAttribute('href','assets/css/brand-'+brand+'.css')
          document.head.appendChild(newStyling);
          setTimeout(()=>{
            ele.remove();
          },500);
        }
      }
  }
  return true;
}

}
