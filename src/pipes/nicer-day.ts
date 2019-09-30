import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'nicerDay'
})
export class NicerDay {
   constructor(private sanitizer: DomSanitizer) {}
   transform(value) {
     let result = value+'.';

     if(parseInt(value) == 1) result = "Erster";
     if(parseInt(value) == 2) result = "Zweiter";
     if(parseInt(value) == 3) result = "Dritter";
     if(parseInt(value) == 4) result = "Vierter";
     if(parseInt(value) == 5) result = "Fünfter";

     return result;
   }
}
