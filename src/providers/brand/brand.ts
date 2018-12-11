import {Injectable} from '@angular/core';

@Injectable()
export class BrandProvider {

  constructor() {
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
}
