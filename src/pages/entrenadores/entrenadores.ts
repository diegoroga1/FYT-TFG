import { Component } from '@angular/core';
import {DataTrainer} from '../../providers/data-trainer';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,Response } from '@angular/http'
import { Tabs } from '../tabs/tabs';

import * as _ from 'lodash';
@IonicPage()
@Component({
  selector: 'page-entrenadores',
  templateUrl: 'entrenadores.html'
})

export class Entrenadores {
  title_page:any;
  json_entrenadores:any;
  data:any;

  busqueda:string='';
  nombre_entrenadores:any=[];
  lugar_entrenamiento:any;
  especialidad_entrenadores:any=[];
  result_entrenadores:any=[];

  constructor(public navCtrl: NavController,
              public http:Http,
              public dataTrainer:DataTrainer,
              public navParams: NavParams) {
    this.title_page="Entrenadores";


    console.log(this.dataTrainer.getData());
    this.dataTrainer.getData().subscribe(data=>{
      this.json_entrenadores=data.users;
      console.log(this.json_entrenadores);
    });
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
}
