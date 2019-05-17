import { Injectable, Inject } from '@angular/core';
import { ENV } from './../../../env.js';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class BrandProvider {

  constructor(@Inject(DOCUMENT) document) {
    this.switchBrandTheme('gp');
  }

  public getLogoUrl(brand: string): string {
    switch (brand.toUpperCase()) {
      case "EP":
        return "assets/logos/europace.png";
      case "FM":
        return "assets/logos/finmas.png";
      case "GP":
        return "assets/logos/genopace.png";
      default:
        return "";
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
