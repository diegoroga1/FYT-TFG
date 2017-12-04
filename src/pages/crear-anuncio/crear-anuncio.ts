import { Component ,Inject} from '@angular/core';
import {IonicPage, NavController,ViewController, NavParams, ActionSheetController, Alert, AlertController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
import {NuevaTarifa} from '../nueva-tarifa/nueva-tarifa';
import {VistaMapa} from '../vista-mapa/vista-mapa';
import {Perfil} from '../perfil/perfil';
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
  foto1Preview:any;
  foto2Preview:any;
  foto3Preview:any;

  foto2:any;
  foto3:any;
  storageRef:any;
  userKey:any;
  tarifasArray=[];
  hasService;
  horariosObject;
  dias=['lunes','martes','miercoles','jueves','viernes','sabado','domingo'];
  franjasShow:boolean[]=[false,false,false,false,false,false,false];
  especialidades:FirebaseListObservable<any>;
  lugares=[];
  franja1FromL:any;
  today;
  dd;
  mm;
  yyyy;

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
      'tarifas':[''],
      'especialidad':[''],
      'horarios':this.fb.group({
          'lunes':this.fb.group({
            'franja1From':[''],
            'franja1To':[''],
            'franja2From':[''],
            'franja2To':[''],
            'franja3From':[''],
            'franja3To':['']
          })
          ,
        'martes':this.fb.group({
          'franja1From':[''],
          'franja1To':[''],
          'franja2From':[''],
          'franja2To':[''],
          'franja3From':[''],
          'franja3To':['']
        }),
        'miercoles':this.fb.group({
            'franja1From':[''],
            'franja1To':[''],
            'franja2From':[''],
            'franja2To':[''],
            'franja3From':[''],
            'franja3To':['']

        }),
        'jueves':this.fb.group({
            'franja1From':[''],
            'franja1To':[''],
            'franja2From':[''],
            'franja2To':[''],
            'franja3From':[''],
            'franja3To':['']

        }),
        'viernes':this.fb.group({
            'franja1From':[''],
            'franja1To':[''],
            'franja2From':[''],
            'franja2To':[''],
            'franja3From':[''],
            'franja3To':['']

        }),
        'sabado':this.fb.group({
            'franja1From':[''],
            'franja1To':[''],
            'franja2From':[''],
            'franja2To':[''],
            'franja3From':[''],
            'franja3To':['']
        }),
        'domingo':this.fb.group({
            'franja1From':[''],
            'franja1To':[''],
            'franja2From':[''],
            'franja2To':[''],
            'franja3From':[''],
            'franja3To':['']

        })
      })
    })

    this.storageRef = firebaseApp.storage().ref();
    this.userKey=localStorage.getItem('user_uid');
    this.especialidades=this.af.list('/especialidades');
    this.getData()
  }
  ionViewDidEnter(){
    this.hasService=this.navParams.get('hasService');
    console.log(this.formulario.value.horarios.lunes);
    console.log(this.navParams.get('tarifa'));
    console.log("Otra vez");
    console.log(this.lugares);
    this.getDateToday();


    if(localStorage.getItem('lugares')) {
      var arrayLugares=JSON.parse(localStorage["lugares"]);
      for(var i=0;i<arrayLugares.length;i++){
        this.lugares.push(arrayLugares[i])
      }
      console.log(JSON.parse(localStorage["lugares"]));
      console.log(this.lugares);

    }
    localStorage.removeItem('lugares');
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
      console.log(JSON.stringify(this.userKey));

      this.storageRef.child(this.userKey+'/foto-servicio/foto1.jpg').putString(this.foto1,'base64').then(snapshot=>{
      }).catch(error=>{
        console.log(JSON.stringify("ERROR "+error))

      });
    }
    if(this.foto2){
      this.storageRef.child(this.userKey+'/foto-servicio/foto2.jpg').putString(this.foto2,'base64').then(snapshot=>{
      }).catch(error=>{
        console.log(JSON.stringify("ERROR "+error))

      });
    }

    if(this.foto3){
      this.storageRef.child(this.userKey+'/foto-servicio/foto3.jpg').putString(this.foto3,'base64').then(snapshot=>{
      }).catch(error=>{
        console.log(JSON.stringify("ERROR "+error))
      });
    }
  /*  this.af.object('entrenadores/'+this.userKey+'/servicio/fechaCreacion').forEach(data=>{
      console.log(data);
    })*/
    this.af.object('entrenadores/'+this.userKey+'/servicio')
      .update({
        'tarifas':this.tarifasArray,
        'especialidad':this.formulario.value.especialidad,
        'lugares':this.lugares,
        'horarios':this.formulario.value.horarios,
        'fechaCreacion':this.today
      }).then(success=>console.log(JSON.stringify("HECHO "+success))
    ).catch(error=>console.log(JSON.stringify("ERROR "+error)));
    console.log(this.formulario.value.especialidad);
    localStorage.removeItem('tarifas');
    this.navCtrl.setRoot(Perfil)


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
      console.log(JSON.stringify(err));
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
    this.navCtrl.push(VistaMapa,this.userKey);
  }
  getData(){
    var esp=[];
    if(this.storageRef.child('/'+this.userKey+'/foto-servicio/foto1.jpg')){
      this.storageRef.child('/'+this.userKey+'/foto-servicio/foto1.jpg').getDownloadURL().then(url=>{
        this.foto1Preview=url;
      }).catch(err=>console.log(err));
    }
    if(this.storageRef.child('/'+this.userKey+'/foto-servicio/foto2.jpg')){
      this.storageRef.child('/'+this.userKey+'/foto-servicio/foto2.jpg').getDownloadURL().then(url=>{
        this.foto2Preview=url;
      }).catch(err=>console.log(err));
    }
    if(this.storageRef.child('/'+this.userKey+'/foto-servicio/foto3.jpg')){
      this.storageRef.child('/'+this.userKey+'/foto-servicio/foto3.jpg').getDownloadURL().then(url=>{
        this.foto3Preview=url;
      }).catch(err=>console.log(err));
    }
   this.af.list('entrenadores/'+this.userKey+'/servicio').forEach(data=>{
     console.log(data);
     data.forEach(item=>{
       if(item.$key=="titulo"){
         this.formulario.controls[item.$key].setValue(item.$value);
       }
       if(item.$key=="especialidad"){
         this.formulario.controls[item.$key].setValue(item);
         console.log(item);
       }
       if(item.$key=="tarifas"){
         console.log  (item);
         item.forEach(tarifa=>{
           console.log(tarifa);
         })
         this.tarifasArray=item;
         console.log(this.tarifasArray)
       }
       if(item.$key=="lugares"){
         console.log(item);
         this.lugares=item;
       }
       if(item.$key=="horarios"){

         console.log(item.domingo);
         console.log(this.formulario);
         console.log(this.formulario.controls[item.$key])
         this.formulario.controls[item.$key].patchValue(item);
       }
     })
   })

  }


}
