import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustByPass'
})
export class TrustByPass {
   constructor(private sanitizer: DomSanitizer) {}
   transform(value) {
     return /*this.sanitizer.bypassSecurityTrustHTML*/(value);
   }
}