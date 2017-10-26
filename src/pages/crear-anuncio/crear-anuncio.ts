import { Component ,Inject} from '@angular/core';
import {IonicPage, NavController,ViewController, NavParams, ActionSheetController, Alert, AlertController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
import {NuevaTarifa} from '../nueva-tarifa/nueva-tarifa';
import {VistaMapa} from '../vista-mapa/vista-mapa';
/**
 * Generated class for the CrearAnuncio page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-crear-anuncio',
  templateUrl: 'crear-anuncio.html',
})
export class CrearAnuncio {
  formulario: FormGroup;
  foto1:any;
  foto2:any;
  foto3:any;
  storageRef:any;
  userKey:any;
  tarifasArray=[];
  franjasShow:boolean[]=[false,false,false,false,false,false,false];
  especialidades:FirebaseListObservable<any>;
  lugares=[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public actionSheetCtrl:ActionSheetController,
              public alertCtrl:AlertController,
              public camera:Camera,
              @Inject(FirebaseApp) firebaseApp: firebase.app.App,
              public af:AngularFireDatabase,
              public viewCtrl:ViewController

  ) {
    this.formulario=this.fb.group({
      'titulo':['',[Validators.required,Validators.minLength(5), Validators.maxLength(25)]],
      'tarifas':['',[Validators.required,Validators.minLength(15), Validators.maxLength(120)]],
      'especialidad':['']
    })
    this.storageRef = firebaseApp.storage().ref();
    this.userKey=localStorage.getItem('user_uid');
    this.especialidades=this.af.list('/especialidades');
  }
  ionViewDidEnter(){

    console.log(this.navParams.get('tarifa'));
    console.log("Otra vez");
    console.log(this.lugares);
    if(localStorage.getItem('lugares')){
      this.lugares=JSON.parse(localStorage["lugares"])
      console.log(JSON.parse(localStorage["lugares"]));
    }
    if(localStorage.getItem('tarifas')){
      this.tarifasArray=JSON.parse(localStorage["tarifas"])
      console.log(this.tarifasArray);
    }
  }
  addTarifa(){
   this.navCtrl.push(NuevaTarifa)
  }
  crearAnuncio(){
    //ALERT PARA AÑADIR TARIFA CREADO, GUARDADO EN ARRAY, FALTA SUBIR A LA RAMA//
    if(this.foto1){
      this.storageRef.child('/'+this.userKey+'/fotoAnuncio/foto1.jpg').putString(this.foto1,'base64').then(snapshot=>{
      }).catch(error=>{
      });
    }
    if(this.foto2){
      this.storageRef.child('/'+this.userKey+'/fotoAnuncio/foto2.jpg').putString(this.foto2,'base64').then(snapshot=>{
      }).catch(error=>{

      });
    }
    if(this.foto3){
      this.storageRef.child('/'+this.userKey+'/fotoAnuncio/foto3.jpg').putString(this.foto3,'base64').then(snapshot=>{
      }).catch(error=>{
      });
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearAnuncio');
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
  mostrarFranjas(dia){
    console.log(dia);

    if(dia.id=='L'){
      this.franjasShow[0]=!this.franjasShow[0];
    }
    if(dia.id=='M'){
      this.franjasShow[1]=!this.franjasShow[1];
    }if(dia.id=='X'){
      this.franjasShow[2]=!this.franjasShow[2];
    }if(dia.id=='J'){
      this.franjasShow[3]=!this.franjasShow[3];
    }if(dia.id=='V'){
      this.franjasShow[4]=!this.franjasShow[4];
    }if(dia.id=='S'){
      this.franjasShow[5]=!this.franjasShow[5];
    }if(dia.id=='D'){
      this.franjasShow[6]=!this.franjasShow[6];
    }

  }
  irAlMapa(){
    this.navCtrl.push(VistaMapa);
  }

}
