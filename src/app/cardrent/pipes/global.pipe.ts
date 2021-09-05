import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'levelPipe'
})
export class GlobalPipe implements PipeTransform {

  transform(param:number){
    let title;
    if(param == 0)
      title="Dificil Acceso";
    else if(param == 1)
      title="Aproximado";
    else if(param == 2)
      title="Cercano";
    else if(param == 3)
      title="Bueno";
    else if(param == 4)
      title="Muy bueno";
    else if(param == 5)
      title="Excelente"
    else
      title="Sin evaluar";

    return title
  }

}

@Pipe({
  name: 'iconType'
})
export class IconTypePipe implements PipeTransform{
  transform(param:string){
    let icon;
    if(param == "casa")
      icon="home";
    else if(param== "apartamento")
      icon="holiday_village";
    else if(param == "bungalow" || param == "cabaña")
      icon="bungalow";
    else if(param == "hotel")
      icon = "night_shelter";
    return icon;
  }
}

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


