import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minimrent'
})
export class MinimrentPipe implements PipeTransform {

  transform(value: number,param:string){
    let data;
    if(param=="night"){
      if(value>1){
        data = "noches";
      }else{
        data = "noche";
      }
    }else if(param=="capacity"){
      if(value>1){
        data = "personas";
      }else{
        data = "persona"
      }
    }
    
    return data;
  }
}


