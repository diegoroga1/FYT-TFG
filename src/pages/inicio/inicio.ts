import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tabs } from '../tabs/tabs';
import {FirebaseListObservable,AngularFireDatabase} from "angularfire2/database";
import {CogerDatos} from '../../providers/coger-datos';
import {CardPubli} from '../../components/card-publi/card-publi'
import {VistaPublicacion} from '../../pages/vista-publicacion/vista-publicacion'
import * as _ from 'lodash';

/**
 * Generated class for the Inicio page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class Inicio {
  especialidades:any;
  publicaciones:FirebaseListObservable<any>;
  especialidadConPubli=[];
  entrenadores:any;
  entrenador:any;
  busquedaArray=[];
  busqueda;
  splash = true;
  tabBarElement: any;
  array=[];
  pfisicas=[];
  gap=[];
  epersonal=[];
  pilates=[];
  yoga=[];

  constructor(public cogerDatos:CogerDatos,public navCtrl: NavController, public navParams: NavParams,public af:AngularFireDatabase) {
    this.tabBarElement = document.querySelector('.tabbar');

    this.af.list('/especialidades').subscribe(data=>{
      console.log(data);
      this.especialidades=data;
      console.log(this.especialidades);
      this.publicaciones=this.cogerDatos.getPublicacionesTrainer();
      this.publicaciones.forEach(data=>{
        console.log(data);
          data.forEach(data2=>{

            if('Pruebas fisicas' === data2.especialidad){
              console.log(data2);
              this.pfisicas.push(data2);

            }else if('Yoga'==data2.especialidad){
              this.yoga.push(data2)
            }else if('Pilates'==data2.especialidad){
              this.pilates.push(data2)
            }else if('Entrenamiento personal'==data2.especialidad){
              this.epersonal.push(data2)
            }else if('GAP'==data2.especialidad){
              this.gap.push(data2)
            }
          })

      })
  });
  }
  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      this.tabBarElement.style.display = 'flex';
    }, 4000);
    console.log('ionViewDidLoad Inicio');
    console.log(this.publicaciones);
  }
  getSearch(busqueda){
    this.busquedaArray=[];

    var q=busqueda.srcElement.value;
    if(!q){
      return;
    }
    this.publicaciones.forEach(data=>{
      _.map(data,publi=>{
        console.log(q);
        this.af.object('/entrenadores/'+publi.keyUser).forEach(items=>{
          if(_.includes(items.nombre.toLowerCase(),q.toLowerCase())||_.includes(items.apellidos.toLowerCase(),q.toLowerCase())){
            if(!_.includes(this.busquedaArray,publi)){
              this.busquedaArray.push(publi);
            }
          }
        })
        console.log(publi.descripcion);
        console.log(publi.titulo);
        if(_.includes(publi.descripcion.toLowerCase(),q.toLowerCase())||_.includes(publi.titulo.toLowerCase(),q.toLowerCase())||_.includes(publi.especialidad.toLowerCase(),q.toLowerCase())){
          if(!_.includes(this.busquedaArray,publi)){
            this.busquedaArray.push(publi);
          }
        }

      })
    })
    console.log(this.busquedaArray);



  }


}
