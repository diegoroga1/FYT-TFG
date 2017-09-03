import { Component } from '@angular/core';
import {Platform, NavController ,NavParams} from 'ionic-angular';
import {Entrenadores} from '../entrenadores/entrenadores'
import {Inicio} from '../inicio/inicio'
import {Perfil} from '../perfil/perfil'
import {Chat} from '../chat/chat'

/**
 * Generated class for the Tabs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {
  tab1Root: any = Inicio;
  tab2Root: any = Entrenadores;
  tab3Root: any = Perfil;
  tab4Root: any = Chat;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tabs');
  }

}
