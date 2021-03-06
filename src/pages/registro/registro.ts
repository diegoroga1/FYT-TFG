import {Component, Inject} from '@angular/core';
import {IonicPage, NavController,ToastController, NavParams, Events, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Perfil} from '../perfil/perfil';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import {FirebaseApp} from "angularfire2";

/**
 * Generated class for the Registro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class Registro {
  formRegister: FormGroup;
  showRegister=false;
  userKey:any;
  userProfile:any;
  userEmail:any;
  storageRef:any;
  logotipo:any;
  rolSelect:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public auth:AngularFireAuth,
              public fb:AngularFireDatabase,
              private facebook: Facebook,
              private google:GooglePlus,
              public events:Events,
              public alert:AlertController,
              @Inject(FirebaseApp) firebaseApp: firebase.app.App,
              public toast:ToastController



  ) {
    this.formRegister=this.createForm();
    this.storageRef = firebaseApp.storage().ref();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registro');
  }
  ionViewDidEnter(){
    this.storageRef.child('logotipo4.png').getDownloadURL()
      .then(url => this.logotipo = url)
      .catch(error=>console.log(error));

  }
  mostrarRegistroCorreo(){
  this.showRegister=!this.showRegister;
  }
  crearUsuario(){
    if(this.confirmPassword()){
      this.auth.auth.createUserWithEmailAndPassword(this.formRegister.value.email,this.formRegister.value.passwordRetry.password)
        .then(success=> {
          console.log(success);
          if(this.formRegister.value.rol=="usuario"){
            this.fb.object('usuarios/' + success.uid).set({
              nombre: this.formRegister.value.nombre,
              apellidos: this.formRegister.value.apellidos,
              email: this.formRegister.value.email,
              rol: this.formRegister.value.rol
            })
          }else{
            this.fb.object('usuarios/' + success.uid).set({
              email: this.formRegister.value.email,
              nombre:this.formRegister.value.nombre,
              apellidos: this.formRegister.value.apellidos,
              rol:this.formRegister.value.rol
            });
            this.fb.object('entrenadores/'+success.uid).set({
              nombre: this.formRegister.value.nombre,
              apellidos: this.formRegister.value.apellidos,
              email: this.formRegister.value.email,
              estado:"confirmado"
            })
          }
          this.userEmail= this.formRegister.value.email
          this.userKey=success.uid;
          localStorage.setItem("user_uid",this.userKey);
          sessionStorage.setItem("user_uid",this.userKey);
          this.events.publish('useractual:changed', this.userKey);
          this.events.publish('rol:changed', this.userKey);
          let toast = this.toast.create({
            message: 'Cuenta creada correctamente.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          let toast2 = this.toast.create({
            message: 'Sesión iniciada. Bienvenido a FYT.',
            duration: 3000,
            position: 'bottom'
          });
          toast2.present();
          this.navCtrl.setRoot(Perfil);
        }).catch(error=>{
          console.log(error);
      })
    }

  }
  alertRol(option){
    let prompt = this.alert.create({
      title: 'Tipo de usuario',
      message: "Selecciona un tipo de usuario con el que te registrarás",
      inputs: [
        {
          name: 'entrenador',
          label:'Entrenador',
          type:'radio',
          value:'entrenador'
        },
        {
          name: 'usuario',
          label:'Usuario',
          type:'radio',
          value:'usuario'
        }
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
            if(option=='facebook'){
              this.facebookLogin(data);

            }else if(option=='google'){
              this.googleLogin(data)
            }


          }
        }
      ]
    });
    prompt.present();
  }
  confirmPassword(){
    if(this.formRegister.value.passwordRetry.password==this.formRegister.value.passwordRetry.passwordConfirm){
        return true;
      }
  }
  private createForm(){
      return this.formBuilder.group({
        nombre:['',[Validators.required]],
        apellidos:['',[Validators.required]],
        email:['',[Validators.required]],
        passwordRetry:this.formBuilder.group({
          password: ['', [Validators.required]],
          passwordConfirm: ['', [Validators.required]]
        }),
        rol:['',[Validators.required]]
      });
  }
  facebookLogin(rol){
    this.rolSelect=rol;
    this.facebook.login(['email']).then((response)=>{
      console.log("Respuesta Login facebook "+JSON.stringify(response))
      const facebookCredential=firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
        .then((success)=>{
          console.log("Firebase success: "+ JSON.stringify(success));
          if(response.status=='connected'){
            this.userEmail=success.email;
            this.userKey=success.uid;
            localStorage.setItem("user_uid",this.userKey);
            sessionStorage.setItem("user_uid",this.userKey);
            this.events.publish('useractual:changed', this.userKey);
            this.events.publish('rol:changed', this.userKey);
            this.userProfile=success;
            this.fb.object('usuarios/'+success.uid).forEach(data=>{
              if(data.email==null){
                let toast = this.toast.create({
                  message: 'Cuenta creada correctamente.',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
                if(this.rolSelect=='entrenador'){
                  this.fb.object('entrenadores/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'entrenador','estado':'confirmado'})
                  this.fb.object('usuarios/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'entrenador'})

                }else{
                  this.fb.object('usuarios/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'usuario'})
                }

              }else{
                console.log("Si existe usuario");
              }
            })
            let toast = this.toast.create({
              message: 'Sesión iniciada. Bienvenido a FYT.',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            this.navCtrl.setRoot(Perfil);
          }

        })

        .catch((error)=>{
          console.log("Firebase failure: " + JSON.stringify(error));
        })
    }).catch((error)=>{
      console.log(error);
    })
  }
  googleLogin(rol){
    this.rolSelect=rol;
    this.google.login({
      'webClientId':'179397221458-cob5ulb97r6vma5e2r82opt0q1b1ab1j.apps.googleusercontent.com',
      'offline':true
    }).then((response)=>{
      console.log("Respuesta Login google "+JSON.stringify(response))
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(response.idToken))
        .then((success)=>{
          console.log("Respuesta Login google credential "+JSON.stringify(success))
          this.userEmail=success.email
          this.userKey=success.uid
          localStorage.setItem("user_uid",this.userKey);
          sessionStorage.setItem("user_uid",this.userKey);
          this.events.publish('useractual:changed', this.userKey);
          this.events.publish('rol:changed', this.userKey);
          this.userProfile=success;
          this.fb.object('usuarios/'+success.uid).forEach(data=>{
            if(data.email==null){
              let toast = this.toast.create({
                message: 'Cuenta creada correctamente.',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              if(this.rolSelect=='entrenador'){
                this.fb.object('entrenadores/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'entrenador','estado':'confirmado'})
                this.fb.object('usuarios/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'entrenador'})

              }else{
                this.fb.object('usuarios/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'usuario'})
              }

            }else{
              console.log("Si existe usuario");
            }
          })
          let toast = this.toast.create({
            message: 'Sesión iniciada. Bienvenido a FYT.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          this.navCtrl.setRoot(Perfil);
        }).catch(err=>console.log("NOT GOOGLE SUCCESS"));
    })
  }
}

