import { Injectable,Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {FirebaseListObservable,AngularFireDatabase} from "angularfire2/database";
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
/*
  Generated class for the CogerDatos provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CogerDatos {
  data:any;
  datos=[];
  entrenadores=[];
  publicaciones=[];
  constructor(public af:AngularFireDatabase,@Inject(FirebaseApp) firebaseApp: firebase.app.App) {
    console.log('Hello CogerDatos Provider');
    this.af.list('/usuarios').forEach(data=>{
      this.datos.push(data);
    })
    this.af.list('/entrenadores').forEach(data=>{
      data.forEach(items=>{
        this.entrenadores.push(items);

        })
      this.entrenadores.forEach(data=>{
        console.log(data);
        data.publicaciones.forEach(items=>{
          this.publicaciones.push(items);
          console.log(items);
        })
      })
    })
  }

  getDataUser(){
    return this.datos;

  }
  getDataTrainer(){
    console.log(this.entrenadores);
    return this.entrenadores
  }
  getPublicacionesTrainer(){

    return this.publicaciones
  }
  /*getPhotoTrainer(){
    firebaseApp.storage().ref().child('/fotos-perfil/').getDownloadURL().then(url => this.imageDefault = url);

  }*/

}
