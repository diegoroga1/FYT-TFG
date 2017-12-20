import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Toast } from '@ionic-native/toast';
import {Platform} from "ionic-angular";
import {MapComponent} from "../../components/map-component/map-component";
/**
 * Generated class for the DetallesMapaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detalles-mapa',
  templateUrl: 'detalles-mapa.html',
})
export class DetallesMapaPage {
  datosLugares:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public platform:Platform) {
   this.datosLugares=this.navParams.data;
    console.log(this.datosLugares);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallesMapaPage');

  }

  ionViewDidEnter(){

  }

}
