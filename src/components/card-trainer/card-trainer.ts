import { Component,Input ,Inject} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
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
  @Input('apellidos') apellidos:string;
  @Input('localidad') localidad:string;
  @Input('especialidades') especialidades:any;
  @Input('fotoPerfil') fotoPerfil:any;
  @Input('key') key:any;

  constructor(public navCtl:NavController,@Inject(FirebaseApp) public firebaseApp: firebase.app.App) {
    console.log('Hello CardTrainer Component');
    this.text = 'Hello World';

  }
  ngOnInit() {
    console.log(this.key);
    this.firebaseApp.storage().ref().child('fotos-perfil/' + this.key + '/perfil.jpg').getDownloadURL()
      .then(url => this.fotoPerfil = url)
      .catch(error=>console.log(error));
  }



  }
