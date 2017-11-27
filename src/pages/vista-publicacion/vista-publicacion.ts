import { Component,Inject } from '@angular/core';
import {IonicPage, NavController, AlertController, NavParams, ActionSheetController} from 'ionic-angular';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
import {FirebaseListObservable,AngularFireDatabase} from "angularfire2/database";
import { SocialSharing } from '@ionic-native/social-sharing';
import {VistaEntrenador} from "../vista-entrenador/vista-entrenador";
import {Camera} from "@ionic-native/camera";
import {MediaCapture,MediaFile} from "@ionic-native/media-capture";
import {VideoPlayer} from "@ionic-native/video-player";

/**
 * Generated class for the VistaPublicacion page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var window:any;

@IonicPage()
@Component({
  selector: 'page-vista-publicacion',
  templateUrl: 'vista-publicacion.html',
})
export class VistaPublicacion {
  datosPublicacion:any;
  files:any;
  storageRef: any;
  foto1:any;
  foto2:any;
  foto3:any;
  video1:any;
  video2:any;
  entrenador:any;
  likes=0;
  currentUser:any;
  constructor(public af:AngularFireDatabase,public navCtrl: NavController,@Inject(FirebaseApp) public firebaseApp: firebase.app.App,
              public navParams: NavParams,
              private socialSharing: SocialSharing,
              public alertCtrl:AlertController,
              public actionSheetCtrl:ActionSheetController,
              private camera: Camera,
              public mediaCapture:MediaCapture,
              private videoPlayer:VideoPlayer) {
    this.storageRef = firebaseApp.storage().ref();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VistaPublicacion');
    this.getPubli()
  }
  ionViewDidEnter(){
    if(!this.foto1&&!this.foto2&&!this.foto3&&!this.video1&&!this.video2){
      console.log("no hay fotos");
      document.getElementById('content').style.top="10%";
    }
    this.currentUser=localStorage.getItem('user_uid');

  }
  getPubli(){
    this.datosPublicacion=this.navParams.data;
    console.log(this.datosPublicacion)
    console.log(this.datosPublicacion.titulo);
    this.getFilesPubli(this.datosPublicacion.userKey,this.datosPublicacion.key);
    this.af.object('entrenadores/'+this.datosPublicacion.userKey).forEach(data=>{
      this.entrenador=data.nombre +' '+data.apellidos;

    })
    this.af.object('/publicaciones/'+this.datosPublicacion.key).forEach(data=>{
      this.likes=data.likes;
    })

  }
  getFilesPubli(keyUser,keyPubli){
    this.storageRef.child('/'+keyUser+'/'+keyPubli+'/foto-publi/foto1.jpg').getDownloadURL()
      .then(url => this.foto1 = url)
      .catch(error=>console.log(error));
   this.storageRef.child('/'+keyUser+'/'+keyPubli+'/foto-publi/foto2.jpg').getDownloadURL()
      .then(url => this.foto2 = url)
      .catch(error=>console.log(error));
   this.storageRef.child('/'+keyUser+'/'+keyPubli+'/foto-publi/foto3.jpg').getDownloadURL()
      .then(url => this.foto3 = url)
      .catch(error=>console.log(error));
   this.storageRef.child('/'+keyUser+'/'+keyPubli+'/video-publi/video1.jpg').getDownloadURL()
      .then(url => this.video1 = url)
      .catch(error=>console.log(error));
   this.storageRef.child('/'+keyUser+'/'+keyPubli+'/video-publi/video2.jpg').getDownloadURL()
      .then(url => this.video2 = url)
      .catch(error=>console.log(error));

  }
  sharePubli(publi){
    console.log(publi);
    var message='<h1>'+this.entrenador+'</h1><br><div><h3>'+publi.titulo+'</h3></div><h4>'+publi.descripcion+'</h4><img src="'+this.foto1+'"/>';
    this.socialSharing.share('Comparto contigo', 'Find Your Trainer App',message,null).then(success=>{
      console.log(JSON.stringify(success))
    }).catch(error=>console.log(JSON.stringify(error)))
  }
  verMasDe(){
    console.log(this.datosPublicacion.userkey)
    this.navCtrl.push(VistaEntrenador,{'userkey':this.datosPublicacion.userKey,'segment':'blog'});
  }
  modificarPublicacion(item){
    if(item=='titulo'){
      this.editarTitulo();
    }else if(item=='descripcion'){
      this.editarDescripcion()
    }
  }
  editarTitulo(){
    let prompt = this.alertCtrl.create({
      title: 'Título',
      message: "Edita el título de tu publicación",
      inputs: [
        {
          name: 'titulo',
          placeholder: 'Nuevo título'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            this.datosPublicacion.titulo=data.titulo;
            this.af.object('publicaciones/'+this.datosPublicacion.key).update({'titulo':data.titulo});


          }
        }
      ]
    });
    prompt.present();
  }
  editarDescripcion(){
    let prompt = this.alertCtrl.create({
      title: 'Descripción',
      message: "Edita la descripción de tu publicación",
      inputs: [
        {
          name: 'descripcion',
          placeholder: 'Nueva descripción',
          type:'textarea'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            this.datosPublicacion.descripcion=data.descripcion;
            this.af.object('publicaciones/'+this.datosPublicacion.key).update({'descripcion':data.descripcion});


          }
        }
      ]
    });
    prompt.present();
  }
  editarFoto(foto){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar fuente ',
      buttons: [
        {
          text: 'Cargar desde galería',
          icon:'images',
          handler: () => {
            //;
            this.choosePicture(foto)
          }
        },
        {
          text: 'Usar Camara',
          icon:'camera',
          handler: () => {
            this.takePicture(foto);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  takePicture(foto){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 50,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData)=>{
      if(foto=='foto1'){
        this.foto1=imageData;
        this.storageRef.child(this.currentUser+'/'+this.datosPublicacion.key+'/foto-publi/foto1.jpg').putString(this.foto1,'base64').then(snapshot=>{
        }).catch(error=>{
        });
      }
      else if(foto=='foto2'){
        this.foto2=imageData;
        this.storageRef.child(this.currentUser+'/'+this.datosPublicacion.key+'/foto-publi/foto2.jpg').putString(this.foto2,'base64').then(snapshot=>{
        }).catch(error=>{
        });
      }
      else if(foto=='foto3'){
        this.foto3=imageData;
        this.storageRef.child(this.currentUser+'/'+this.datosPublicacion.key+'/foto-publi/foto3.jpg').putString(this.foto3,'base64').then(snapshot=>{
        }).catch(error=>{
        });
      }
    }),(err)=>{
      console.log(err);
    }
  }
  choosePicture(foto){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 50,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData)=>{

      if(foto=='foto1'){
        this.foto1=imageData;
        this.storageRef.child(this.currentUser+'/'+this.datosPublicacion.key+'/foto-publi/foto1.jpg').putString(this.foto1,'base64').then(snapshot=>{
        }).catch(error=>{
        });
      }
      else if(foto=='foto2'){
        this.foto2=imageData;
        this.storageRef.child(this.currentUser+'/'+this.datosPublicacion.key+'/foto-publi/foto2.jpg').putString(this.foto2,'base64').then(snapshot=>{
        }).catch(error=>{
        });
      }
      else if(foto=='foto3'){
        this.foto3=imageData;
        this.storageRef.child(this.currentUser+'/'+this.datosPublicacion.key+'/foto-publi/foto3.jpg').putString(this.foto3,'base64').then(snapshot=>{
        }).catch(error=>{
        });
      }
    }),(err)=>{
      console.log(err);
    }
  }
  editarVideo(video){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar fuente ',
      buttons: [
        {
          text: 'Cargar desde galería',
          icon:'videocamera',
          handler: () => {
            //;
            this.selectvideo(video)
          }
        },
        {
          text: 'Usar Video Camara',
          icon:'videocamera',
          handler: () => {
            this.startrecording(video);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  public optionsCamera={
    sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    mediaType:this.camera.MediaType.ALLMEDIA,
    destinationType:this.camera.DestinationType.FILE_URI
  }
  startrecording(id) {
    let options={
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetWidth: 640,
    }
    this.mediaCapture.captureVideo(options).then((data:MediaFile[])=>{
      for(var i=0;i<data.length;i++){
        let temp=data[i];

      }
    })
  }

  selectvideo(id) {
    this.camera.getPicture(this.optionsCamera).then((data) => {
      window.resolveLocalFileSystemURL("file://"+data,FE=>{
        FE.file(file=>{
          const FR=new FileReader();
          FR.onloadend=((res:any)=>{
            let AF=res.target.result;
            console.log(JSON.stringify(AF));
            let blob=new Blob([new Uint8Array(AF)],{type:'video/mp4'})
            if(id=='video1'){
              this.video1=blob;
              this.storageRef.child(this.currentUser+'/'+this.datosPublicacion.key+ '/video-publi/video1.mp4').put(this.video1);

            }
            if(id=='video2'){
              this.video2=blob;
              this.storageRef.child(this.currentUser+'/'+this.datosPublicacion.key+'/video-publi/video2.mp4').put(this.video2);

            }
          });
          FR.readAsArrayBuffer(file);
        })
      });
    })
  }

}
