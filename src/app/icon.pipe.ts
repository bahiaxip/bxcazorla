import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(value: string): unknown {
    let data;
    if(value=="casa"){
      data="home";
    }else{
      data="close"
    }

    return data;
  }

}
