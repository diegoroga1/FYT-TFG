import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {CrearAnuncio} from '../crear-anuncio/crear-anuncio'
/**
 * Generated class for the NuevaTarifa page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nueva-tarifa',
  templateUrl: 'nueva-tarifa.html',
})
export class NuevaTarifa {
  datosTarifa=[];
  inputs=[];
  descripcion=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AngularFireAuth,public af:AngularFireDatabase) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaTarifa');
  }
  addMoreDescription(){
    this.inputs.push({value:' '});

  }
  ionViewDidEnter(){
    if(localStorage.getItem('tarifas')){
      this.datosTarifa=JSON.parse(localStorage.getItem('tarifas'));
      console.log(this.datosTarifa);
    }
  }
  submitLogin(form){
    console.log(this.descripcion);
    console.log(form.value);

    this.datosTarifa.push(form.value);
    console.log(this.datosTarifa);
    localStorage.setItem('tarifas',JSON.stringify(this.datosTarifa)) ;
    this.navCtrl.pop();
  }
}
