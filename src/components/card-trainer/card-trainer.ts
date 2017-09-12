import { Component,Input } from '@angular/core';
import {NavController} from 'ionic-angular';
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

  constructor(public navCtl:NavController) {
    console.log('Hello CardTrainer Component');
    this.text = 'Hello World';
  }


}
