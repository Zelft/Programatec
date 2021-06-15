import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inicial'
})
export class InicialPipe implements PipeTransform {

  transform(value: string ): string {
    value = value.toLowerCase();
    let names = value.split(' '); 

    names = names.map(name =>{
      return name[0].toUpperCase();
    });
    
    return names.join(' ');
  }

}
