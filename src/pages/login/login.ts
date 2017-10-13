import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from '../perfil/perfil';

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
  userEmail:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public af: AngularFireDatabase,
              public events:Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
  submitLogin(form){
    this.email=form.value.email;
    this.password=form.value.password;
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

}
