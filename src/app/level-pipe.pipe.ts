import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'levelPipe'
})
export class LevelPipePipe implements PipeTransform {

  /*
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
  */

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
