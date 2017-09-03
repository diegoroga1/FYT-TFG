import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello CardPubli Component');
    this.text = 'Hello World';
  }

}
