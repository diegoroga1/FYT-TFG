import { Component,Input } from '@angular/core';

/**
 * Generated class for the CardPubli component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'card-publi',
  templateUrl: 'card-publi.html'
})
export class CardPubli {
  @Input('titulo') titulo:any;
  @Input('descripcion') descripcion:any;
  @Input('especialidad') especialidad:any;
  @Input('entrenador') entrenador:any;
  text: string;


  constructor() {
    console.log('Hello CardPubli Component');
    this.text = 'Hello World';
  }

}
