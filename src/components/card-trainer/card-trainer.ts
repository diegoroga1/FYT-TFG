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
  @Input('especialidad') especialidad:any;
  @Input('fotoPerfil') fotoPerfil:any;
  @Input('servicio') servicio:any;
  @Input('key') key:any;
  precioBajo;
  valoraciones;
  valoracionMedia;
  constructor(public navCtl:NavController,@Inject(FirebaseApp) public firebaseApp: firebase.app.App) {
    console.log('Hello CardTrainer Component');
    this.text = 'Hello World';
    this.precioBajo=0;


  }
  ngOnInit() {

    this.firebaseApp.storage().ref().child(this.key +'/foto-perfil/perfil.jpg').getDownloadURL()
      .then(url => this.fotoPerfil = url)
      .catch(error=>console.log(error));
    this.servicio.tarifas.forEach(data=>{
      this.precioBajo=data.precio;
      if(data.precio<this.precioBajo&&data.precio!='GRATIS'){
        this.precioBajo=data.precio;
      }else if(data.precio=='GRATIS'){
        this.precioBajo=='GRATIS';
      }
      console.log(this.precioBajo);

    })
      this.valoraciones=this.servicio.numeroValoraciones;
    this.valoracionMedia=this.servicio.valoracionTotal;
    console.log(this.valoraciones);


  }




  }
