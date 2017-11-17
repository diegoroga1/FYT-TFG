import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrdenarPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'ordenar',
})
export class OrdenarPipe implements PipeTransform {
  transform(values: Array<any>, propiedades: string[], direccion: string[] ): Array<any> {

    // en el atributo dirreccion se escribe "des" o "DES" para invertir el orden en sentido descendente y "asc" o "ASC" para un orden ascendente


    for( let x = propiedades.length-1; x >=0 ; x-- ){
      let mapped = values.map(function( el, i ) {
        return { index: i, value: el };

      })
      mapped.sort(function(a, b) {
        return +( a.value[propiedades[x]] > b.value[propiedades[x]]) || +(a.value[propiedades[x]] === b.value[propiedades[x]] ) - 1;
      });

      values = mapped.map(function(el){
        return values[el.index];
      });
      if( direccion[x] === "des" || direccion[x] === "DES" ){
        values = values.reverse();
      }

    }
    return values;
  }
}
