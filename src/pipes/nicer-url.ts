import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nicerUrl'
})
export class NicerUrl implements PipeTransform {
   constructor() {}
   transform(value) {
     let result = value.replace('https://','');
     result = result.replace('http://','');
     return result;
   }
}
