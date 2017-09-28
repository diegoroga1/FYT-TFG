import { Component ,Inject} from '@angular/core';
import {DataTrainer} from '../../providers/data-trainer';
import {CogerDatos} from '../../providers/coger-datos';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,Response } from '@angular/http'
import { Tabs } from '../tabs/tabs';
import {FirebaseListObservable,AngularFireDatabase} from "angularfire2/database";
import {CardTrainer} from '../../components/card-trainer/card-trainer';
import {VistaEntrenador} from '../../pages/vista-entrenador/vista-entrenador'
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
import * as _ from 'lodash';
@IonicPage()
@Component({
  selector: 'page-entrenadores',
  templateUrl: 'entrenadores.html'
})

export class Entrenadores {
  title_page:any;
  json_entrenadores:any;
  datosUsuario:FirebaseListObservable<any>;
  datosEntrenador:FirebaseListObservable<any>;
  busqueda:string='';
  nombre_entrenadores:any=[];
  constructor(public navCtrl: NavController,
              public http:Http,
              public cogerDatos:CogerDatos,
              public navParams: NavParams,) {
    this.title_page="Entrenadores";
    this.datosUsuario=this.cogerDatos.getDataUser();
    this.datosEntrenador=this.cogerDatos.getDataTrainer();

  }
  ionViewDidEnter(){
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Entrenadores');
  }
  buscarEntrenador(){
    let searchLower=this.busqueda.toLowerCase();
    let filtradoNombres=[];
    let nombre_entrenadores=_.filter(this.json_entrenadores,ents=>(<any>ents).nombre.toLowerCase().includes(searchLower));
    if(nombre_entrenadores.length){
      nombre_entrenadores.forEach(item=>{
        filtradoNombres.push({nombre:item.nombre});
      })
    }
    this.nombre_entrenadores=filtradoNombres;
  }
  irAVistaEntrenador(entrenador,fotoPerfil){
    console.log(fotoPerfil);
    this.navCtrl.push(VistaEntrenador,{entrenador,fotoPerfil})
  }
}
