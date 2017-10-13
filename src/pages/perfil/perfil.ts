import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tabs } from '../tabs/tabs';
import {CrearPublicacion} from '../crear-publicacion/crear-publicacion'
import {CrearAnuncio} from '../crear-anuncio/crear-anuncio'
import {Login} from '../login/login'
import {Registro} from '../registro/registro'
import {CogerDatos} from '../../providers/coger-datos';
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
  user=false;
  currentUser:any=[];
  perfilSegment:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cogerDatos: CogerDatos
  ) {
    this.perfilSegment='info';
    this.cogerDatos.getDataCurrentUser(localStorage.getItem('user_uid'))

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Perfil');
    if(localStorage.getItem('user_uid')){
      this.user=true;
    }else{
      this.user=false;

    }
    this.currentUser=this.cogerDatos.currentUser;
    console.log(this.currentUser)
  }
  crearPublicacion(){
    this.navCtrl.push(CrearPublicacion);
  }
  crearAnuncio(){
    this.navCtrl.push(CrearAnuncio)
  }
  irALogin(){
    this.navCtrl.push(Login);
  }
  irARegistro(){
    this.navCtrl.push(Registro);
  }
}
