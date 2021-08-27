import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconmy'
})
export class IconPipe implements PipeTransform {

  transform(value: string): string {
    let data;
    if(value=="casa"){
      data="home";
    }else{
      data="close"
    }

    return data;
  }

}
