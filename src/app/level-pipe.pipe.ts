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
