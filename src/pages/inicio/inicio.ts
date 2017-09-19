import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tabs } from '../tabs/tabs';
import {FirebaseListObservable,AngularFireDatabase} from "angularfire2/database";
import {CogerDatos} from '../../providers/coger-datos';
import {CardPubli} from '../../components/card-publi/card-publi'
import {VistaPublicacion} from '../../pages/vista-publicacion/vista-publicacion'
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
  constructor(public cogerDatos:CogerDatos,public navCtrl: NavController, public navParams: NavParams,public af:AngularFireDatabase) {
    this.af.list('/especialidades').subscribe(data=>{
      console.log(data);
      this.especialidades=data;
      console.log(this.especialidades);
      this.publicaciones=this.cogerDatos.getPublicacionesTrainer();
      this.publicaciones.forEach(data=>{
        this.especialidades.forEach(item=>{
          console.log(item.$key);
          data.forEach(data2=>{
            if(item.$key === data2.especialidad){
              console.log("incluye");
              if(this.especialidadConPubli.indexOf(item.$key)){
                this.especialidadConPubli.push(item.$key);

              }

            }
          })
        })
      })
  });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Inicio');
    console.log(this.publicaciones);
  }
  irAVistaPublicacion(publicacion){
    this.navCtrl.push(VistaPublicacion,publicacion);
  }


}
