import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from '../perfil/perfil';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import firebase from 'firebase';
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
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public af: AngularFireDatabase,
              public events:Events,
              public formBuilder: FormBuilder,
              private facebook: Facebook,
              private google:GooglePlus
    ) {
    this.formLogin=this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
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

  facebookLogin(){
    this.facebook.login(['email']).then((response)=>{
      console.log("Respuesta Login facebook "+JSON.stringify(response))
      const facebookCredential=firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
        .then((success)=>{
          console.log("Firebase success: "+ JSON.stringify(success));
          if(response.status=='connected'){
            alert("Email "+success.email +' - '+ 'Key '+success.uid);
            this.userEmail=success.email;
            this.userKey=success.uid;
            localStorage.setItem("user_uid",this.userKey);
            sessionStorage.setItem("user_uid",this.userKey);
            this.events.publish('useractual:changed', this.userKey);
            this.events.publish('rol:changed', this.userKey);
            this.userProfile=success;
            this.af.object('usuarios/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'usuario'})
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
  googleLogin(){
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
         this.af.object('usuarios/'+success.uid).set({'email':success.email,'nombre':success.displayName,'rol':'usuario'})
         this.navCtrl.setRoot(Perfil);
         alert("LOGIN GOOGLE SUCCESS");
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
