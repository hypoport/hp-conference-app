import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'nicerDay'
})
export class NicerDay {
   constructor(private sanitizer: DomSanitizer) {}
   transform(value) {
     let result = value+'. Tag';

     if(parseInt(value) == 1) result = "Erster Tag";
     if(parseInt(value) == 2) result = "Zweiter Tag";
     if(parseInt(value) == 3) result = "Dritter Tag";
     if(parseInt(value) == 4) result = "Vierter Tag";
     if(parseInt(value) == 5) result = "Fünfter Tag";

     return result;
   }
}
