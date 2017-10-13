import { Component,ViewChild,ViewChildren,HostListener,ElementRef,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseListObservable,AngularFireDatabase} from "angularfire2/database";
import {CardPubli} from '../../components/card-publi/card-publi'
import {MapComponent} from '../../components/map-component/map-component'
import {VistaMapa} from '../vista-mapa/vista-mapa'
import {VistaPublicacion} from '../vista-publicacion/vista-publicacion'
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
  lp;
  mp;
  xp;
  jp;
  vp;
  sp;
  dp;

  @ViewChild('horario') horario:ElementRef;
  @ViewChild('listFab') listFab:ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, public domsanitizer: DomSanitizer,@Inject(FirebaseApp) public firebaseApp: firebase.app.App) {
    this.entrenadorSegment='info';
    this.lp=true;
    this.mp=false;
    this.xp=false;
    this.jp=false;
    this.vp=false;
    this.sp=false;
    this.dp=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VistaEntrenador');
    this.getDataTrainer()
    console.log(this.datosEntrenador.publicaciones);
  }
  getDataTrainer() {

      this.datosEntrenador=this.navParams.data.entrenador;
    this.firebaseApp.storage().ref().child('fotos-perfil/' + this.datosEntrenador.$key + '/perfil.jpg').getDownloadURL().then(url => this.fotoPerfil = url);

    this.datosEntrenador.especialidades.forEach(data=>{
      this.especialidadesEntrenador.push(data);
    })
    if(this.datosEntrenador.publicaciones){
      this.datosEntrenador.publicaciones.forEach(data => {
        this.publicacionesEntrenador.push(data)
      });
    }
  }
  segmentChanged(e){
    console.log(this.datosEntrenador);
    console.log(e)

  }
  showMap(){
    this.navCtrl.push(VistaMapa);
  }
  irAVistaPublicacion(publicacion,e){
   if(e.srcElement.getAttribute("name")!='close'&&  e.srcElement.getAttribute("name")!='share'){
     this.navCtrl.push(VistaPublicacion,publicacion);


   }
  }

  mostrarDisponibilidad(fab){
    for(let i=0;i<this.listFab.nativeElement.children.length;i++){
      for(let j=0;j<this.listFab.nativeElement.children[i].children.length;j++){
        this.listFab.nativeElement.children[i].children[j].style.backgroundColor='#FF3D00';
        this.listFab.nativeElement.children[i].children[j].style.color='white';
      }
    }
    fab._elementRef.nativeElement.style.background='white';
    fab._elementRef.nativeElement.style.color='#FF3D00';

    if(fab._elementRef.nativeElement.id=="L"){
      this.lp=true;
      this.mp=false;
      this.xp=false;
      this.jp=false;
      this.vp=false;
      this.sp=false;
      this.dp=false;
    }
    else if(fab._elementRef.nativeElement.id=="M"){
      this.lp=false;
      this.mp=true;
      this.xp=false;
      this.jp=false;
      this.vp=false;
      this.sp=false;
      this.dp=false;
    }
    else if(fab._elementRef.nativeElement.id=="X"){
      this.lp=false;
      this.mp=false;
      this.xp=true;
      this.jp=false;
      this.vp=false;
      this.sp=false;
      this.dp=false;
    }

    else if(fab._elementRef.nativeElement.id=="J"){
      this.lp=false;
      this.mp=false;
      this.xp=false;
      this.jp=true;
      this.vp=false;
      this.sp=false;
      this.dp=false;
    }
    else if(fab._elementRef.nativeElement.id=="V"){
      this.lp=false;
      this.mp=false;
      this.xp=false;
      this.jp=false;
      this.vp=true;
      this.sp=false;
      this.dp=false;
    }
    else if(fab._elementRef.nativeElement.id=="S"){
      this.lp=false;
      this.mp=false;
      this.xp=false;
      this.jp=false;
      this.vp=false;
      this.sp=true;
      this.dp=false;
    }
    else if(fab._elementRef.nativeElement.id=="D"){
      this.lp=false;
      this.mp=false;
      this.xp=false;
      this.jp=false;
      this.vp=false;
      this.sp=false;
      this.dp=true;
    }
  }





}
