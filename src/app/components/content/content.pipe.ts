import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unlocksRemaining'
})
export class ContentPipe implements PipeTransform {

  transform(unlocksReq:number, unlocks:any): any {
    let count = 0;
    for (let key in unlocks) {
      count++;
    }
    return unlocksReq - count;
  }

}
