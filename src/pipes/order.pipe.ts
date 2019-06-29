import {Pipe} from '@angular/core';

@Pipe({
    name: 'orderBy'
})
export class OrderBy{
 transform(array, orderBy, asc = true,returnItems=2){
   if (!orderBy || orderBy.trim() == ""){return array;} 

    let  arrItems = (asc) ? Array.from(array).sort((item1: any, item2: any) => { 
      return this.orderByComparator(item1[orderBy], item2[orderBy]);
    }) :    Array.from(array).sort((item1: any, item2: any) => { 
      return this.orderByComparator(item2[orderBy], item1[orderBy]);
    });

    if(returnItems>=arrItems.length) return  arrItems;
  
    let orderItems:any[]=[];
    for(let i=0;i<returnItems;i++){
      orderItems.push(arrItems[i]);
    }

     return orderItems ;

 }

 orderByComparator(a, b):number{
  if (a === b) {
    return 0;
  }
  if (a == null) {
    return 1;
  }
  if (b == null) {
    return -1;
  }
  return(Math.round( a * 10 ) / 10 > Math.round( b * 10 ) / 10) ? 1 : -1;
 }
}