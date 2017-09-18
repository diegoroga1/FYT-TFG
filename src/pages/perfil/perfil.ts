import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tabs } from '../tabs/tabs';
import {CrearPublicacion} from '../crear-publicacion/crear-publicacion'
import {CrearAnuncio} from '../crear-anuncio/crear-anuncio'
/**
 * Generated class for the Perfil page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class Perfil {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Perfil');
  }
  crearPublicacion(){
    this.navCtrl.push(CrearPublicacion);
  }
  crearAnuncio(){
    this.navCtrl.push(CrearAnuncio)
  }
}
