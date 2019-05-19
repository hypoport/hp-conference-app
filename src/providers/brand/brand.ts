import { Injectable, Inject } from '@angular/core';
import { ENV } from './../../../env.js';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class BrandProvider {

  constructor(@Inject(DOCUMENT) document) {
  }

  public getLogoUrl(brand: string): string {
    switch (brand.toUpperCase()) {
      case "ep":
        return "assets/logos/europace.png";
      case "fm":
        return "assets/logos/finmas.png";
      case "gp":
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

    let knownBrands = ENV.knownBrands;
    if(knownBrands.indexOf(brand) === -1){
      console.log('UNKNOWN BRAND: '+brand);
      return false;
    }

    console.log('LOAD BRANDING: '+brand);

    for(let i = 0; i < links.length; i++){
        let ele = links[i];
        if(ele.getAttribute('rel') == 'stylesheet'){
          if(ele.getAttribute('href').indexOf('build/') !== -1
          || (ele.getAttribute('href').indexOf('assets/css') !== -1 && ele.getAttribute('href').indexOf('assets/css/brand-'+brand+'.css') === -1) ){
            var newStyling = document.createElement("link");
            newStyling.setAttribute('rel','stylesheet');
            if(brand == 'hp'){
              newStyling.setAttribute('href','build/main.css')
            } else {
              newStyling.setAttribute('href','assets/css/brand-'+brand+'.css')
            }
            setTimeout(()=>{
              document.head.appendChild(newStyling);
            },50);
            setTimeout(()=>{
              ele.remove();
            },1200);
          }
        }
    }
    return true;
  }

}
