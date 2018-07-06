import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthname'
})
export class MonthnamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ];
        return monthNames[value - 1];
  }

}
