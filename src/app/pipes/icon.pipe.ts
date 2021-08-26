import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

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
    else
      icon="home";
    
    return icon;
  }

}
