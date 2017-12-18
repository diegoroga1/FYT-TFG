import {Component, Inject} from '@angular/core';
import { IonicPage,AlertController, NavController, ToastController,NavParams,Events,LoadingController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from '../perfil/perfil';
import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import {FirebaseApp} from "angularfire2";
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  email:any;
  password:any;
  userKey:any;
  userProfile:any;
  userEmail:any;
  formLogin : FormGroup;
  rolSelect:any;
  storageRef:any;
  logotipo:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public af: AngularFireDatabase,
                public events:Events,
              public formBuilder: FormBuilder,
              private facebook: Facebook,
              private google:GooglePlus,
              public loadingCtrl: LoadingController,
              public alert:AlertController,
              @Inject(FirebaseApp) firebaseApp: firebase.app.App,
              public toast:ToastController

  ) {
    this.formLogin=this.createForm();
    this.storageRef = firebaseApp.storage().ref();

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');

  }
  ionViewDidEnter(){
   this.storageRef.child('logotipo4.png').getDownloadURL()
      .then(url => this.logotipo = url)
      .catch(error=>console.log(error));
  }
  submitLogin(form){
    this.email=this.formLogin.value.email;
    this.password=this.formLogin.value.password;
    this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password).then((success)=>{
      console.log(success);
      localStorage.setItem("user_uid",success.uid);
      sessionStorage.setItem("user_uid",success.uid);
      this.events.publish('useractual:changed', success.uid);
      this.events.publish('rol:changed', success.uid);
      this.userKey=success.uid;
      this.userEmail=success.email;
      let toast = this.toast.create({
        message: 'Sesión iniciada. Bienvenido a FYT.',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.setRoot(Perfil);
    }).catch(
      (error)=>{
        switch (error.message) {
          case "There is no user record corresponding to this identifier. The user may have been deleted.":
            // Cambiar por toast
            break;
          case "The password is invalid or the user does not have a password.":
            // Cambiar por toast
            break;
        }
      }
    );
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

  facebookLogin(rol){
    this.rolSelect=rol;
    this.facebook.login(['email', 'public_profile']).then((response:FacebookLoginResponse)=>{
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
            this.af.object('usuarios/'+success.uid).forEach(data=>{
              if(data.email==null){
                let toast = this.toast.create({
                  message: 'Cuenta creada correctamente',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
                if(this.rolSelect=='entrenador'){
                  this.af.object('entrenadores/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'entrenador','estado':'confirmado'})
                  this.af.object('usuarios/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'entrenador'})

                }else{
                  this.af.object('usuarios/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'usuario'})
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
      console.log("Error"+ error);
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
         console.log("Firebase success: "+ JSON.stringify(success));
         this.userProfile=success;
         this.af.object('usuarios/'+success.uid).forEach(data=>{
           if(data.email==null){
             let toast = this.toast.create({
               message: 'Cuenta creada correctamente.',
               duration: 3000,
               position: 'bottom'
             });
             toast.present();
             if(this.rolSelect=='entrenador'){
               this.af.object('entrenadores/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'entrenador','estado':'confirmado'})
               this.af.object('usuarios/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'entrenador'})

             }else{
               this.af.object('usuarios/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'usuario'})
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
       }).catch(err=>alert("NOT GOOGLE SUCCESS"));
    })
  }
  private createForm(){
    return this.formBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }


}
