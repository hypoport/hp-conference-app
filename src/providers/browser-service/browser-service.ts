import { Injectable, Inject, ElementRef } from '@angular/core';
import { ENV } from './../../../env.js';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class BrowserService {


constructor(private iab : InAppBrowser){  }


public enableDynamicHyperlinks(element: ElementRef) : void
{
   // Provide a minor delay to allow the HTML to be rendered and 'found'
   // within the view template
   setTimeout(() =>
   {
      // Query the DOM to find ALL occurrences of the <a> hyperlink tag
      const urls : any = element.nativeElement.querySelectorAll('a');

      // Iterate through these
      urls.forEach((url) =>
      {
         // Listen for a click event on each hyperlink found
         url.addEventListener('click', (event) =>
         {
            // Retrieve the href value from the selected hyperlink
            event.preventDefault();
            let link = event.target.href;
            this.launchInAppBrowser(link);
         }, false);
      });
   }, 2000);
}


private launchInAppBrowser(link : string) : void
{
   let opts : string = "location=no"
   this.iab.create(link, '_system', opts);
}

}
