import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricePipe'
})
export class PricePipe implements PipeTransform {
//parámetro value es un objeto de tipo price-rent
//index permite 
  transform(value: any,index:number) {
    let data=[];
    //lista de posible capacidad de personas  
    let iterable=[1,2,4,5,6,8,12];
    for(let num of iterable){
      console.log("desde pipe")
      if(value['minNight'+num] !=null){
        data.push(value['minNight'+num]);
      }
    }
    //devuelve array de 
    return data[index];
  }

}
