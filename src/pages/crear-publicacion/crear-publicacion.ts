import { Component,Inject,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,ActionSheetController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { MediaCapture,MediaFile } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
import { VideoPlayer,VideoOptions } from '@ionic-native/video-player';

declare var window:any;
/**
 * Generated class for the CrearPublicacion page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-crear-publicacion',
  templateUrl: 'crear-publicacion.html',
})
export class CrearPublicacion {
  foto1;
  foto1Preview;
  foto2;
  foto2Preview;
  foto3;
  foto3Preview;
  video1;
  video2;
  storageRef;
  userKey;
  publicacionObject;
  videoOption:VideoOptions;
  videoUrl:any;
  storeVideo=[];
  especialidades:FirebaseListObservable<any>;
  especialidad;
  @ViewChild('video1') myVideo1:any;
  today;
  dd;
  mm;
  yyyy;

  public optionsCamera={
    sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    mediaType:this.camera.MediaType.ALLMEDIA,
    destinationType:this.camera.DestinationType.FILE_URI
  }

  constructor(public navCtrl: NavController, @Inject(FirebaseApp) firebaseApp: firebase.app.App,
              public af:AngularFireDatabase,public actionSheetCtrl:ActionSheetController,
              public navParams: NavParams,
              public camera:Camera,
              public mediaCapture:MediaCapture,
              private videoPlayer:VideoPlayer) {

    this.storageRef = firebaseApp.storage().ref();
    this.userKey=localStorage.getItem('user_uid');
    this.videoOption={
      volume:0.7
    }
    this.especialidades=this.af.list('/especialidades');

  }
  ionViewDidEnter(){
    this.getDateToday()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearPublicacion');

  }
  getDateToday(){
    this.today = new Date();
    this.dd = this.today.getDate();
    this.mm = this.today.getMonth()+1; //January is 0!
    this.yyyy = this.today.getFullYear();

    if(this.dd<10) {
      this.dd = '0'+this.dd
    }

    if(this.mm<10) {
      this.mm = '0'+this.mm
    }

    this.today = this.dd + '/' + this.mm + '/' + this.yyyy;
  }
  addPhoto(id){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar fuente ',
      buttons: [
        {
          text: 'Cargar desde galería',
          icon:'images',
          handler: () => {
            //;
            this.choosePicture(id)
          }
        },
        {
          text: 'Usar Camara',
          icon:'camera',
          handler: () => {
            this.takePicture(id);
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
  takePicture(id){

    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 50,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData)=>{
      if(id=="1"){
        this.foto1=imageData;
        this.foto1Preview='data:image/jpeg;base64,'+imageData;
      }
      else if(id=="2"){
        this.foto2=imageData;
        this.foto2Preview='data:image/jpeg;base64,'+imageData;
      }
      else if(id=="3"){
        this.foto3=imageData;
        this.foto3Preview='data:image/jpeg;base64,'+imageData;
      }

    }),(err)=>{
      console.log(err);
    }
  }
  choosePicture(id){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 50,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData)=>{
      if(id=="1"){
        this.foto1=imageData;
        this.foto1Preview='data:image/jpeg;base64,'+imageData;
      }
      else if(id=="2"){
        this.foto2=imageData;
        this.foto2Preview='data:image/jpeg;base64,'+imageData;
      }
      else if(id=="3"){
        this.foto3=imageData;
        this.foto3Preview='data:image/jpeg;base64,'+imageData;
      }
    }),(err)=>{
      console.log(err);
    }
  }
  crearPubli(form){
    this.publicacionObject={
      'titulo':form.value.titulo,
      'descripcion':form.value.descripcion,
      'likes':0,
      'keyUser':this.userKey,
      'especialidad':form.value.especialidad,
      'fechaPublicacion':this.today
    };


    this.af.list('publicaciones/').push(this.publicacionObject).then(success=>{
      console.log(success);
      if(this.foto1){
        this.storageRef.child(this.userKey+'/'+success.key+'/foto-publi/foto1.jpg').putString(this.foto1,'base64').then(snapshot=>{
        }).catch(error=>{
        });
      }
      if(this.foto2){
        this.storageRef.child(this.userKey+'/'+success.key+'/foto-publi/foto2.jpg').putString(this.foto2,'base64').then(snapshot=>{
        }).catch(error=>{
        });
      }
      if(this.foto3){
        this.storageRef.child(this.userKey+'/'+success.key+'/foto-publi/foto3.jpg').putString(this.foto3,'base64').then(snapshot=>{
        }).catch(error=>{
        });
      }
      if(this.video1){
        this.storageRef.child(this.userKey+'/'+success.key+ '/video-publi/video1.mp4').put(this.video1);

      }
      if(this.video2){
        this.storageRef.child(this.userKey+'/'+success.key+'/video-publi/video2.mp4').put(this.video2);

      }
      this.af.object('entrenadores/'+this.userKey+'/servicio/publicaciones/'+success.key).set(success.key);
    });
    this.navCtrl.pop();
  }
  addVideo(id){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar fuente ',
      buttons: [
        {
          text: 'Cargar desde galería',
          icon:'videocamera',
          handler: () => {
            //;
            this.selectvideo(id)
          }
        },
        {
          text: 'Usar Video Camara',
          icon:'videocamera',
          handler: () => {
            this.startrecording(id);
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
  startrecording(id) {
    let options={
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetWidth: 640,
    }
    this.mediaCapture.captureVideo(options).then((data:MediaFile[])=>{
      for(var i=0;i<data.length;i++){
        let temp=data[i];
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(data[i]));
        this.storeVideo.push({"src":temp.fullPath})
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
            console.log(JSON.stringify(blob));
            console.log(JSON.stringify(data));
            this.upload(data,id);
          });
          FR.readAsArrayBuffer(file);
        })
      });
    })
  }
  upload(blob,id) {
    console.log(JSON.stringify(blob));
    if(id==1){
      this.video1=blob;
    }else if(id==2){
      this.video2=blob;
    }

  }
  async playVideo(url){
    try{
      this.videoUrl="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4";
      this.videoPlayer.play(this.videoUrl,this.videoOption)
    }
    catch(e) {
      console.error(e);
    }
  }
  getData() {
    var esp = [];
    if (this.storageRef.child('/' + this.userKey + '/foto-publi/foto1.jpg')) {
      this.storageRef.child('/' + this.userKey + '/foto-publi/foto1.jpg').getDownloadURL().then(url => {
        this.foto1Preview = url;
      }).catch(err => console.log(err));
    }
    if (this.storageRef.child('/' + this.userKey + '/foto-publi/foto2.jpg')) {
      this.storageRef.child('/' + this.userKey + '/foto-publi/foto2.jpg').getDownloadURL().then(url => {
        this.foto2Preview = url;
      }).catch(err => console.log(err));
    }
    if (this.storageRef.child('/' + this.userKey + '/foto-publi/foto3.jpg')) {
      this.storageRef.child('/' + this.userKey + '/foto-publi/foto3.jpg').getDownloadURL().then(url => {
        this.foto3Preview = url;
      }).catch(err => console.log(err));
    }
  }

}
