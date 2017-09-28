import { Component,ViewChild,ViewChildren,ElementRef,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseListObservable,AngularFireDatabase} from "angularfire2/database";
import {CardPubli} from '../../components/card-publi/card-publi'
import {MapComponent} from '../../components/map-component/map-component'
import {VistaMapa} from '../vista-mapa/vista-mapa'
import { DomSanitizer } from '@angular/platform-browser';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
/**
 * Generated class for the VistaEntrenador page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vista-entrenador',
  templateUrl: 'vista-entrenador.html',
})
export class VistaEntrenador {
  buttonClicked:boolean=false;
  datosEntrenador:any;
  datos=[];
  entrenadorSegment;
  especialidadesEntrenador=[];
  publicacionesEntrenador=[];
  fotoPerfil:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public domsanitizer: DomSanitizer,@Inject(FirebaseApp) public firebaseApp: firebase.app.App) {
    this.entrenadorSegment='info';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VistaEntrenador');
    this.getDataTrainer()
    console.log(this.datosEntrenador.publicaciones);
  }
  getDataTrainer() {

      this.datosEntrenador=this.navParams.data.entrenador;
    this.firebaseApp.storage().ref().child('fotos-perfil/' + this.datosEntrenador.$key + '/perfil.jpg').getDownloadURL().then(url => this.fotoPerfil = url);

      console.log(this.fotoPerfil);



    this.datosEntrenador.especialidades.forEach(data=>{
      this.especialidadesEntrenador.push(data);
    })
    if(this.datosEntrenador.publicaciones){
      this.datosEntrenador.publicaciones.forEach(data => {
        this.publicacionesEntrenador.push(data)
      });
    }

    console.log(this.publicacionesEntrenador)
  }
  segmentChanged(e){
    console.log(this.datosEntrenador);
    console.log(e)
  }
  showMap(){
    this.navCtrl.push(VistaMapa);
  }



}
