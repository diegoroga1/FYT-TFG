import { Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ActionSheetController,ToastController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { Camera } from '@ionic-native/camera';

import {CrearPublicacion} from '../crear-publicacion/crear-publicacion'
import {CrearAnuncio} from '../crear-anuncio/crear-anuncio'
import {Login} from '../login/login'
import {Registro} from '../registro/registro'
import {CogerDatos} from '../../providers/coger-datos';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';


/**
 * Generated class for the Perfil page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})

export class Perfil {
  user = false;
  publicacionUsuario=[];
  usuarios:FirebaseListObservable<any>;
  perfilSegment: any;
  storageRef: any;
  userKey:any="";
  fechaNacimiento:any;
  inputPlace:any;
  autocomplete:any;
  localidad:any;
  base64img:any;
  tamanoFormacion:any;
  formacion:any;
  tamanoExperiencia:any;
  experiencia:any;
  isTrainer=false;
  hasService:boolean=false;
  publiFb:any;
  fotoPerfil:any;
  logoCara:any;
  logoTrainer:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cogerDatos: CogerDatos,
              @Inject(FirebaseApp) firebaseApp: firebase.app.App,
              public alertCtrl:AlertController,
              public af:AngularFireDatabase,
              public auth:AngularFireAuth,
              public http:Http,
              private camera: Camera,
              public actionSheetCtrl:ActionSheetController,
              public toast:ToastController

  ) {



    this.perfilSegment = 'info';
    this.publiFb=this.af.list('publicaciones/').map((res)=>res.reverse() as FirebaseListObservable<any[]>);
    this.storageRef = firebaseApp.storage().ref();

    this.auth.auth.onAuthStateChanged(data=>{

      if(data!=null){
        this.userKey=data.uid;

      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Perfil');

  }
  userToTrainer(){
    alert("Funcion no disponible");
  }
  ionViewDidEnter(){
    this.af.list('usuarios/'+localStorage.getItem('user_uid')).forEach(data=> {
      data.forEach(item => {
        if (item.$key == 'rol') {
          if (item.$value == 'entrenador') {
            this.user = true;
            this.isTrainer = true;
          }
          else{
            this.user = true;
            this.isTrainer=false;
          }
        }
      })
    });
    if(this.userKey!=""){
      this.crearPerfil();


    this.storageRef.child('/'+this.userKey+'/foto-perfil/perfil.jpg').getDownloadURL()
      .then(url => this.fotoPerfil = url)
      .catch(error=>console.log(error));
    }
    this.storageRef.child('trainer.png').getDownloadURL()
      .then(url => this.logoTrainer = url)
      .catch(error=>console.log(error));
    this.storageRef.child('triste3.png').getDownloadURL()
      .then(url => this.logoCara = url)
      .catch(error=>console.log(error));
    }

  crearPerfil(){
    this.auth.authState.subscribe(auth=>{
     if(auth!=null){
       this.af.list('usuarios/'+auth.uid).forEach(data=>{
         data.forEach(item=>{
           if(item.$key=='rol'){
             if(item.$value=='entrenador'){
               this.usuarios=this.af.list('entrenadores/');
               this.isTrainer=true;
               this.usuarios.forEach(data=>{

                 data.forEach(item=>{
                   if(item.$key==auth.uid){
                     if(item.servicio){

                       this.hasService=true;
                     }else{
                       this.hasService=false;
                     }


                     this.fechaNacimiento=item.fechaNacimiento;
                     this.formacion=item.formacion ;
                     if(this.formacion){
                       this.tamanoFormacion=this.formacion.length;
                     }else{
                       this.tamanoFormacion=0;
                     }
                     this.experiencia=item.experiencia;
                     if(this.experiencia){
                       this.tamanoExperiencia=this.experiencia.length;
                     }
                     else{
                       this.tamanoExperiencia=0;
                     }
                   }
                 })
               })
             }else{
               this.usuarios=this.af.list('usuarios/');
               this.isTrainer=false;
               this.usuarios.forEach(data=>{
                 data.forEach(item=>{
                   if(item.$key==auth.uid){
                     this.fechaNacimiento=item.fechaNacimiento;
                   }
                 })
               })
             }
           }
         })
       })
     }


    })
  }
  editProfile(){
    let prompt = this.alertCtrl.create({
      title: 'Editar perfil',
      message: "Edita tu perfil de usuario",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Introduce tu nombre'
        },
        {
          name: 'apellidos',
          placeholder: 'Introduce tus apellidos'
        },
        {
          name: 'localidad',
          placeholder: 'Introduce tu localidad',
          id:'input-place'
        },
      ],
      cssClass: 'alertStyle',
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

            if(data.nombre !=""){
              if(this.isTrainer){
                this.af.object('/entrenadores/'+this.userKey+'/nombre').set(data.nombre);
              }else{
                this.af.object('/usuarios/'+this.userKey+'/nombre').set(data.nombre);

              }
            }
            if(data.apellidos !=""){

              if(this.isTrainer){
                this.af.object('/entrenadores/'+this.userKey+'/apellidos').set(data.apellidos);
              }else{
                this.af.object('/usuarios/'+this.userKey+'/apellidos').set(data.apellidos);

              }

            }
            if(data.localidad!="" || this.localidad!=""){
              if(this.isTrainer){
                this.af.object('/entrenadores/'+this.userKey+'/localidad')
                  .set(this.localidad!=undefined ? this.localidad : data.localidad);
              }else{
                this.af.object('/usuarios/'+this.userKey+'/localidad')
                  .set(this.localidad!=undefined ? this.localidad : data.localidad);
              }

            }
          }
        }
      ]
    });
    prompt.present().then(data=>{
      this.inputPlace=document.getElementById('input-place');
      this.autocomplete = new google.maps.places.Autocomplete(this.inputPlace);
      this.autocomplete.addListener('place_changed', (data=> {
        this.localidad=this.autocomplete.getPlace().name + ', '+this.autocomplete.getPlace().address_components[1].short_name;
      }))

    });
  }

  creaPublicacion() {
    this.navCtrl.push(CrearPublicacion);
  }

  crearAnuncio() {
    this.navCtrl.push(CrearAnuncio,{'hasService':this.hasService})
  }

  irALogin() {
    this.navCtrl.push(Login);
  }

  irARegistro() {
    this.navCtrl.push(Registro);
  }

  addPhoto() {
    this.storageRef.child(this.userKey+'/foto-perfil/perfil.jpg').putString(this.base64img,'base64').then(snapshot=>{
      this.fotoPerfil='data:image/jpeg;base64,'+this.base64img;
    }).catch(error=>{
      console.log(JSON.stringify(error));

    });
  }
  public actionPhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar fuente ',
      buttons: [
        {
          text: 'Cargar desde galería',
          icon:'images',
          handler: () => {
            //;
            this.choosePicture()
          }
        },
        {
          text: 'Usar Camara',
          icon:'camera',
          handler: () => {
            this.takePicture();
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
  takePicture(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 50,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData)=>{
      this.base64img=imageData;
      this.addPhoto()
    }),(err)=>{
      console.log(JSON.stringify(err));
    }
  }
  choosePicture(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 50,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData)=>{
      this.base64img=imageData;
      this.addPhoto()
    }),(err)=>{
      console.log(JSON.stringify(err));
    }
  }
  addDescription() {
    let prompt = this.alertCtrl.create({
      title: 'Descripción',
      message: "Añade una descripción a tu perfil",
      inputs: [
        {
          name: 'descripcion',
          placeholder: 'Descripción'
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
            this.auth.authState.subscribe(auth=>{
              this.af.list('entrenadores/'+auth.uid)
            })
            this.af.object('/entrenadores/'+this.userKey).update({'descripcion':data.descripcion});


          }
        }
      ]
    });
    prompt.present();
  }
  addPhone(){
    let prompt = this.alertCtrl.create({
      title: 'Teléfono',
      message: "Añade tu teléfono de contacto",
      inputs: [
        {
          name: 'telefono',
          placeholder: 'Teléfono'
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
            this.af.object('/entrenadores/'+this.userKey+'/telefono').set(data.telefono);

          }
        }
      ]
    });
    prompt.present();
  }
  changeEmail(){
    let prompt = this.alertCtrl.create({
      title: 'Correo electrónico',
      message: "Añade tu correo electrónico",
      inputs: [
        {
          name: 'email',
          placeholder: 'Correo electrónico'
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
            this.af.object('/entrenadores/'+this.userKey+'/email').set(data.email);

          }
        }
      ]
    });
    prompt.present();
  }
  addEducation(i){
    let prompt = this.alertCtrl.create({
      title: 'Formación',
      message: "Añade tu formación a tu perfil",
      inputs: [
        {
          name: 'formacion',
          placeholder: 'Formación'
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
            this.af.object('/entrenadores/'+this.userKey+'/formacion/'+i).set(data.formacion);

          }
        }
      ]
    });
    prompt.present();
  }
  addFacebook(){
    let prompt = this.alertCtrl.create({
      title: 'Facebook',
      message: "Añade un enlace a tu cuenta Facebook",
      inputs: [
        {
          name: 'facebook',
          placeholder: 'Facebook'
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
            this.af.object('/entrenadores/'+this.userKey+'/facebook').set(data.facebook);

          }
        }
      ]
    });
    prompt.present();
  }
  addTwitter(){
    let prompt = this.alertCtrl.create({
      title: 'Twitter',
      message: "Añade un enlace a tu cuenta Twitter",
      inputs: [
        {
          name: 'twitter',
          placeholder: 'Twitter'
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
            this.af.object('/entrenadores/'+this.userKey+'/twitter').set(data.twitter);

          }
        }
      ]
    });
    prompt.present();
  }
  addLinkedin(){
    let prompt = this.alertCtrl.create({
      title: 'Linkedin',
      message: "Añade un enlace a tu cuenta Linkedin",
      inputs: [
        {
          name: 'linkedin',
          placeholder: 'Linkedin'
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
            this.af.object('/entrenadores/'+this.userKey+'/linkedin').set(data.linkedin);

          }
        }
      ]
    });
    prompt.present();
  }
  addInstagram(){
    let prompt = this.alertCtrl.create({
      title: 'Instagram',
      message: "Añade un enlace a tu cuenta de Instagram",
      inputs: [
        {
          name: 'instagram',
          placeholder: 'Instagram'
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
            this.af.object('/entrenadores/'+this.userKey+'/instagram').set(data.instagram);

          }
        }
      ]
    });
    prompt.present();
  }
  addExperiencia(i){
    let prompt = this.alertCtrl.create({
      title: 'Experiencia',
      message: "Añade tu experiencia como entrenador",
      inputs: [
        {
          name: 'experiencia',
          placeholder: 'Experiencia'
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
            this.af.object('/entrenadores/'+this.userKey+'/experiencia/'+i).set(data.experiencia);


          }
        }
      ]
    });
    prompt.present();
  }

  addFechaNacimiento(fecha) {
    this.af.object('/entrenadores/'+this.userKey+'/fechaNacimiento').set(fecha);
  }
  addSex(sexo){
    this.af.object('/entrenadores/'+this.userKey+'/sexo').set(sexo);

  }
  addNationality(nacionalidad){
    this.af.object('/entrenadores/'+this.userKey+'/nacionalidad').set(nacionalidad);

  }
  alertLogout(){
    let prompt = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: "¿Desea cerrar la sesión?",
      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('Cancel clicked');
          }
        },

        {
          text: 'Sí',
          handler: data => {
            this.logout();

          }
        }
      ]
    });
    prompt.present();
  }
  logout() {
    this.auth.auth.signOut().then(success =>{
      let toast = this.toast.create({
        message: 'Sesión cerrada correctamente',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();

    })
    localStorage.clear();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  changePassword(){
    let alertCtrl = this.alertCtrl.create({
      title: 'Cambia tu contraseña',
      message: "¿Desea cambiar la contraseña?",
      inputs:[

        {
          name:'currentPassword',
          placeholder:"Introduce la contraseña actual",
          type:'password'
        },
        {
          name:"password1",
          placeholder:"Introduce una contraseña nueva",
          type:'password'
        },
        {
          name:"password2",
          placeholder:"Vuelve a introducir la contraseña",
          type:'password'
        }


      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text:'Confirmar',
          handler:data=>{


            if(data.password1==data.password2){
              //let code="oobCode";
              console.log(this.auth.authState);
              console.log(this.auth.auth.currentUser.email);
              const credentials = firebase.auth.EmailAuthProvider.credential(this.auth.auth.currentUser.email,data.currentPassword );
              this.auth.auth.currentUser.reauthenticateWithCredential(credentials).then(success=>{
                this.auth.auth.currentUser.updatePassword(data.password1).then(success=>{
                  let toast = this.toast.create({
                    message: 'Contraseña cambiada correctamente',
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.present();
                  this.navCtrl.setRoot(this.navCtrl.getActive().component);


                }).catch(error=>{
                  let toast = this.toast.create({
                    message: 'Error al cambiar la contraseña',
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.present();

                });
              }).catch(error=>{
                let toast = this.toast.create({
                  message: 'Contraseña actual incorrecta',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();

              });

            }else{
              let toast = this.toast.create({
                message: 'Las contraseñas no coinciden',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();            }
          }
        }
      ]});
    alertCtrl.present();
  }
  optionsUser(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Configuración de cuenta ',
      buttons: [
        {
          text: 'Cambiar contraseña',
          handler: () => {
            //;
            this.changePassword()
          }
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.alertLogout();
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
}
