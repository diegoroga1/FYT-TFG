import { Component,Input } from '@angular/core';

/**
 * Generated class for the CardTrainer component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'card-trainer',
  templateUrl: 'card-trainer.html'
})
export class CardTrainer {

  text: string;
  @Input('nombre') nombre:string;
  @Input('localidad') localidad:string;
  @Input('especialidad') especialidad:string;

  constructor() {
    console.log('Hello CardTrainer Component');
    this.text = 'Hello World';
  }

}
