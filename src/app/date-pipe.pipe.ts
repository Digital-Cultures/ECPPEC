import { Pipe, PipeTransform } from '@angular/core';
export interface FilterObj {
  lowValue: number;
  highValue: number;
}
@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(items: any[], filter: FilterObj): any {
  	// if (!items || !filter) {
   //          return items;
   //      }

        var filtered = [];
        for (var i = 0; i < items.length; i++) {
        	if(items[i].minYear>=filter.lowValue && items[i].maxYear<=filter.highValue){
        		filtered.push(items[i]);
        	}
        }
        return filtered;
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        // return items.filter(item => item.name.indexOf("York") !== -1);
   // return null;
  }

}
