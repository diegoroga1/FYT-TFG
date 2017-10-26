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
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AngularFireAuth,public af:AngularFireDatabase) {

    this.inputs=[{value:' '}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaTarifa');
  }
  addMoreDescription(){
    this.inputs.push({value:' '});
  }
  submitLogin(form){
    this.datosTarifa.push(form.value)
    console.log(form.value);
    localStorage["tarifas"] = JSON.stringify(this.datosTarifa);
    this.navCtrl.pop();
  }
}
