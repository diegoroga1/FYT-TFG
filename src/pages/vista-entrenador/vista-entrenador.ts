import { Component,ViewChild,ViewChildren,HostListener,ElementRef,Inject } from '@angular/core';
import { IonicPage, NavController,Content, VirtualScroll,NavParams } from 'ionic-angular';
import {FirebaseListObservable,AngularFireDatabase} from "angularfire2/database";
import {CardPubli} from '../../components/card-publi/card-publi'
import {MapComponent} from '../../components/map-component/map-component'
import {VistaMapa} from '../vista-mapa/vista-mapa'
import {VistaPublicacion} from '../vista-publicacion/vista-publicacion'
import { DomSanitizer } from '@angular/platform-browser';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
import {NuevaValoracionPage} from "../nueva-valoracion/nueva-valoracion";
import {DetallesMapaPage} from "../detalles-mapa/detalles-mapa";
import {Chat} from "../chat/chat";
import * as _ from 'lodash';

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
  @ViewChild(VirtualScroll) listView: VirtualScroll;
  @ViewChild(Content) content: Content;

  buttonClicked:boolean=false;
  datosEntrenador:any;
  datos=[];
  entrenadorSegment;
  especialidadesEntrenador=[];
  publicacionesEntrenador=[];
  fotoPerfil:any;
  foto1:any;
  foto2:any;
  foto3:any;
  lp;
  mp;
  xp;
  jp;
  vp;
  sp;
  dp;
  horarios;
  numProf;
  totalProf=0;
  mediaProf=0;
  numTrato;
  totalTrato=0;
  mediaTrato=0;
  numObj;
  totalObj=0;
  mediaObj=0;
  numMoti;
  totalMoti=0;
  mediaMoti=0;
  mediaTotal=0;
  totalValoration=0;
  seguido=false;
  seguidores=0;
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
    this.getDataTrainer()

    this.totalValoraciones(this.datosEntrenador.$key);
    if(!this.foto1&&!this.foto2&&!this.foto3){
      console.log(this.foto1);
      console.log("no hay fotos");
    }

  }
  getDataTrainer() {
    this.publicacionesEntrenador=[];
    console.log(this.navParams.data);
      if(this.navParams.data.entrenador){
        this.datosEntrenador=this.navParams.data.entrenador;
      }else if(this.navParams.data.userkey){
        this.af.object('/entrenadores/'+this.navParams.data.userkey).forEach(data=>{
          console.log(data);
          this.datosEntrenador=data;
          this.entrenadorSegment=this.navParams.data.segment;
        })

      }
      this.horarios=this.datosEntrenador.servicio.horarios;

      this.firebaseApp.storage().ref().child( this.datosEntrenador.$key +'/foto-perfil/perfil.jpg').getDownloadURL()
        .then(url => this.fotoPerfil = url)
        .catch(error=>console.log("NO hay foto de perfil"));

      this.firebaseApp.storage().ref().child( this.datosEntrenador.$key + '/foto-servicio/foto1.jpg').getDownloadURL()
        .then(url => this.foto1 = url)
        .catch(error=>console.log("NO hay foto de perfil")
        );

      this.firebaseApp.storage().ref().child(this.datosEntrenador.$key+ '/foto-servicio/foto2.jpg').getDownloadURL()
        .then(url => this.foto2 = url)
        .catch(error=>console.log("NO hay foto de perfil"));

      this.firebaseApp.storage().ref().child(this.datosEntrenador.$key+'/foto-servicio/foto3.jpg').getDownloadURL()
        .then(url => this.foto3 = url)
        .catch(error=>console.log("NO hay foto de perfil"));


    if(this.datosEntrenador.especialidades){
      this.datosEntrenador.especialidades.forEach(data=>{
        this.especialidadesEntrenador.push(data);
      })
    }
    if(this.datosEntrenador.servicio.publicaciones){
      console.log(this.datosEntrenador.servicio.publicaciones);
      _.map(this.datosEntrenador.servicio.publicaciones,(data)=>{
        this.af.object('publicaciones/'+data).forEach(data=>{
          this.publicacionesEntrenador.push(data);
        })
      })



    }
    this.af.object('usuarios/'+localStorage.getItem('user_uid')+'/seguidos/'+this.datosEntrenador.$key).forEach(data=>{
      if(data.$value==null){
        this.seguido=false;
      }else{
       this.seguido=true;
      }
    })
    this.af.object('entrenadores/'+this.datosEntrenador.$key+'/seguidores').forEach(data=>{

      if(data.$value!=null){
        this.seguidores=data.$value;
      }else{
        this.seguidores=0;
      }

    })
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
    console.log(document.getElementsByTagName('progress'));
    this.mediaProf=((5*(this.numProf.prof5!=undefined?this.numProf.prof5:0) + 4*(this.numProf.prof4!=undefined?this.numProf.prof4:0)
    +3*(this.numProf.prof3!=undefined?this.numProf.prof3:0)+2*(this.numProf.prof2!=undefined?this.numProf.prof2:0)
      + (this.numProf.prof1!=undefined?this.numProf.prof1:0))/(this.totalProf)) ;
    console.log(this.mediaProf);

    this.af.object('entrenadores/'+key+'/servicio/valoraciones/trato/').forEach(data=>{
      this.numTrato=data;
      console.log(this.numTrato)
      this.totalTrato=(data.trato1!=undefined?data.trato1:0) + (data.trato2!=undefined?data.trato2:0)+ (data.trato3!=undefined?data.trato3:0)
        +(data.trato4!=undefined?data.trato4:0)+(data.trato5!=undefined?data.trato5:0);
    });
    this.mediaTrato=((5*(this.numTrato.trato5!=undefined?this.numTrato.trato5:0) + 4*(this.numTrato.trato4!=undefined?this.numTrato.trato4:0)
    +3*(this.numTrato.trato3!=undefined?this.numTrato.trato3:0)+2*(this.numTrato.trato2!=undefined?this.numTrato.trato2:0)
      + (this.numTrato.trato1!=undefined?this.numTrato.trato1:0))/(this.totalTrato));

    this.af.object('entrenadores/'+key+'/servicio/valoraciones/motivacion/').forEach(data=>{
      this.numMoti=data;
      console.log(this.numMoti)
      this.totalMoti=(data.moti1!=undefined?data.moti1:0) + (data.moti2!=undefined?data.moti2:0)+ (data.moti3!=undefined?data.moti3:0)
        +(data.moti4!=undefined?data.moti4:0)+(data.moti5!=undefined?data.moti5:0);
    });
    this.mediaMoti=((5*(this.numMoti.moti5!=undefined?this.numMoti.moti5:0) + 4*(this.numMoti.moti4!=undefined?this.numMoti.moti4:0)
    +3*(this.numMoti.moti3!=undefined?this.numMoti.moti3:0)+2*(this.numMoti.moti2!=undefined?this.numMoti.moti2:0)
      + (this.numMoti.moti1!=undefined?this.numMoti.moti1:0))/(this.totalMoti));

    this.af.object('entrenadores/'+key+'/servicio/valoraciones/objetivos/').forEach(data=>{
      this.numObj=data;
      console.log(this.numObj)
      this.totalObj=(data.obj1!=undefined?data.obj1:0) + (data.obj2!=undefined?data.obj2:0)+ (data.obj3!=undefined?data.obj3:0)
        +(data.obj4!=undefined?data.obj4:0)+(data.obj5!=undefined?data.obj5:0);
    });
    this.mediaObj=((5*(this.numObj.obj5!=undefined?this.numObj.obj5:0) + 4*(this.numObj.obj4!=undefined?this.numObj.obj4:0)
      +3*(this.numObj.obj3!=undefined?this.numObj.obj3:0)+2*(this.numObj.obj2!=undefined?this.numObj.obj2:0)
      + (this.numObj.obj1!=undefined?this.numObj.obj1:0))/(this.totalObj));
    this.mediaTotal=((this.mediaObj + this.mediaTrato + this.mediaProf+this.mediaMoti)/4);
    this.totalValoration=this.totalObj+this.totalMoti+this.totalTrato+this.totalProf;
    this.af.object('entrenadores/'+key+'/servicio/valoracionTotal/').set((this.mediaTotal).toFixed(2));
    this.af.object('entrenadores/'+key+'/servicio/numeroValoraciones/').set(this.totalValoration);
  }

  private scrollTo() {
    let key = '#seccion-valoraciones';

    let hElement: HTMLElement = this.content._elementRef.nativeElement;
    let element = hElement.querySelector(key);
    element.scrollIntoView();

    //wait till scroll animation completes

  }
  valorar(){
    this.navCtrl.push(NuevaValoracionPage,{'key':this.datosEntrenador.$key});
  }
  detallesMapa(lugares){
    this.navCtrl.push(DetallesMapaPage,lugares);
  }

  seguirEntrenador(){
    var total=0;
    var sum=0;
    if(this.seguido){
      console.log("Ya lo sigues")
      this.af.object('entrenadores/'+this.datosEntrenador.$key+'/seguidores').set(this.seguidores-1);
      this.af.list('usuarios/'+localStorage.getItem('user_uid')+'/seguidos/').remove(this.datosEntrenador.$key).then(success=>{
        this.seguido=false;
      });
    }else{
          total=this.seguidores
          console.log(total);
          sum=total+1;
          this.seguidores=sum;
          console.log(this.seguidores)

      this.af.object('entrenadores/'+this.datosEntrenador.$key+'/seguidores').set(this.seguidores);
      this.af.object('usuarios/'+localStorage.getItem('user_uid')+'/seguidos/'+this.datosEntrenador.$key).set(this.datosEntrenador.$key).then(success=>{
       this.seguido=true;
      });
    }








  }
  irAlChat(nombre){
    console.log(nombre);
    this.navCtrl.setRoot(Chat,{'nombre':nombre});
  }

}
