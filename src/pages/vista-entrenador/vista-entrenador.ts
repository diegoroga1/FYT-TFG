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
  rateobj;
  rateprof;
  ratemoti;
  ratetrato;
  numProf;
  totalProf=0;
  mediaProf=0;
  numTrato;
  totalTrato=0;
  mediaTrato=0;
  @ViewChild('horario') horario:ElementRef;
  @ViewChild('listFab') listFab:ElementRef;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public domsanitizer: DomSanitizer,
              @Inject(FirebaseApp) public firebaseApp: firebase.app.App,
              public af:AngularFireDatabase
              ) {
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
  ionViewDidEnter(){
    this.totalValoraciones(this.datosEntrenador.$key);


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
  totalValoraciones(key){
    this.af.object('entrenadores/'+key+'/servicio/valoraciones/profesionalidad/').forEach(data=>{
      this.numProf=data;
      this.totalProf=(data.prof1!=undefined?data.prof1:0) + (data.prof2!=undefined?data.prof2:0)+ (data.prof3!=undefined?data.prof3:0)
        +(data.prof4!=undefined?data.prof4:0)+(data.prof5!=undefined?data.prof5:0);
    });
    this.mediaProf=((5*(this.numProf.prof5!=undefined?this.numProf.prof5:0) + 4*(this.numProf.prof4!=undefined?this.numProf.prof4:0)
    +3*(this.numProf.prof3!=undefined?this.numProf.prof3:0)+2*(this.numProf.prof2!=undefined?this.numProf.prof2:0)
      + (this.numProf.prof1!=undefined?this.numProf.prof1:0))/(this.totalProf))*2;
    console.log(this.mediaProf);

    this.af.object('entrenadores/'+key+'/servicio/valoraciones/trato/').forEach(data=>{
      this.numTrato=data;
      console.log(this.numTrato)
      this.totalTrato=(data.trato1!=undefined?data.trato1:0) + (data.trato2!=undefined?data.trato2:0)+ (data.trato3!=undefined?data.trato3:0)
        +(data.trato4!=undefined?data.trato4:0)+(data.trato5!=undefined?data.trato5:0);
    });
    this.mediaTrato=((5*(this.numTrato.trato5!=undefined?this.numTrato.trato5:0) + 4*(this.numTrato.trato4!=undefined?this.numTrato.trato4:0)
    +3*(this.numTrato.trato3!=undefined?this.numTrato.trato3:0)+2*(this.numTrato.trato2!=undefined?this.numTrato.trato2:0)
      + (this.numTrato.trato1!=undefined?this.numTrato.trato1:0))/(this.totalTrato))*2;
  }
  onModelChange(e,key){
    console.log(this.rateprof);
    console.log(key);
    var sum=0;
    var sum2=0;
    var sum3=0;
    var sum4=0;

    if(this.rateprof>0){
      var val=this.af.object('entrenadores/'+key+'/servicio/valoraciones/profesionalidad/prof'+this.rateprof).forEach(data=>{
        sum = parseInt(data.$value) + 1;
        console.log(sum);
      });
      if(sum>0){
        this.af.object('entrenadores/'+key+'/servicio/valoraciones/profesionalidad/prof'+this.rateprof).set(sum)
      }else{
        this.af.object('entrenadores/'+key+'/servicio/valoraciones/profesionalidad/prof'+this.rateprof).set(1)
      }
      this.rateprof=0;

    }

    if(this.ratemoti>0){
      this.af.object('entrenadores/'+key+'/servicio/valoraciones/motivacion/moti'+this.ratemoti).forEach(data=>{
        sum2 = parseInt(data.$value) + 1;

      });
      if(sum2>0){
        this.af.object('entrenadores/'+key+'/servicio/valoraciones/motivacion/moti'+this.ratemoti).set(sum2)
      }else{
        this.af.object('entrenadores/'+key+'/servicio/valoraciones/motivacion/moti'+this.ratemoti).set(1)
      }
      this.ratemoti=0;
    }

    if(this.rateobj>0){
      this.af.object('entrenadores/'+key+'/servicio/valoraciones/objetivos/obj'+this.rateobj).forEach(data=>{
        sum3 = parseInt(data.$value) + 1;

      });
      if(sum3>0){
        this.af.object('entrenadores/'+key+'/servicio/valoraciones/objetivos/obj'+this.rateobj).set(sum3)
      }else{
        this.af.object('entrenadores/'+key+'/servicio/valoraciones/objetivos/obj'+this.rateobj).set(1)
      }
      this.rateobj=0;
    }

    if(this.ratetrato>0){
      this.af.object('entrenadores/'+key+'/servicio/valoraciones/trato/trato'+this.ratetrato).forEach(data=>{
        sum4= parseInt(data.$value) + 1;

      });
      if(sum4>0){
        this.af.object('entrenadores/'+key+'/servicio/valoraciones/trato/trato'+this.ratetrato).set(sum4)
      }else{
        this.af.object('entrenadores/'+key+'/servicio/valoraciones/trato/trato'+this.ratetrato).set(1)
      }
      this.rateobj=0;
    }
    this.totalValoraciones(key);
  }
  setValoration(){

  }




}
