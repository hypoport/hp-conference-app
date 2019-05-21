import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'nicerDay'
})
export class NicerDay {
   constructor(private sanitizer: DomSanitizer) {}
   transform(value) {
     let result = value+'. Tag';

     if(parseInt(value) == 1) result = "Erster Konferenztag";
     if(parseInt(value) == 2) result = "Zweiter Konferenztag";
     if(parseInt(value) == 3) result = "Dritter Konferenztag";
     if(parseInt(value) == 4) result = "Vierter Konferenztag";
     if(parseInt(value) == 5) result = "Fünfter Konferenztag";

     return result;
   }
}
