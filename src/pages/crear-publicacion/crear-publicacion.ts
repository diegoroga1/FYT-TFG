import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams ,ActionSheetController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
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
  foto2;
  foto3;
  video1;
  video2;
  storageRef;
  userKey;
  publicacionObject;
  constructor(public navCtrl: NavController, @Inject(FirebaseApp) firebaseApp: firebase.app.App,
              public af:AngularFireDatabase,public actionSheetCtrl:ActionSheetController, public navParams: NavParams,public camera:Camera,) {

    this.storageRef = firebaseApp.storage().ref();
    this.userKey=localStorage.getItem('user_uid');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearPublicacion');

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
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData)=>{
      if(id=="1"){
        this.foto1=imageData;
      }
      else if(id=="2"){
        this.foto2=imageData;
      }
      else if(id=="3"){
        this.foto3=imageData;
      }

    }),(err)=>{
      console.log(err);
    }
  }
  choosePicture(id){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData)=>{
      if(id=="1"){
        this.foto1=imageData;
      }
      else if(id=="2"){
        this.foto2=imageData;
      }
      else if(id=="3"){
        this.foto3=imageData;
      }
    }),(err)=>{
      console.log(err);
    }
  }
  crearPubli(form){
    this.publicacionObject={
      'titulo':form.value.titulo,
      'descripcion':form.value.descripcion,
      'likes':0
    };
    if(this.foto1){
      this.storageRef.child(this.userKey+'/foto-publi/foto1.jpg').putString(this.foto1,'base64').then(snapshot=>{
      }).catch(error=>{
      });
    }
    if(this.foto2){
      this.storageRef.child(this.userKey+'/foto-publi/foto2.jpg').putString(this.foto2,'base64').then(snapshot=>{
      }).catch(error=>{
      });
    }
    if(this.foto3){
      this.storageRef.child(this.userKey+'/foto-publi/foto3.jpg').putString(this.foto3,'base64').then(snapshot=>{
      }).catch(error=>{
      });
    }
    this.af.list('publicaciones/').push(this.publicacionObject).then(success=>{
      console.log(success);
      this.af.object('entrenadores/'+this.userKey+'/servicio/publicaciones/'+success.key).set(success.key);
    });
  }
  addVideo(id){

  }
}
