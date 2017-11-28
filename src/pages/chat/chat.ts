import { Component ,Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tabs } from '../tabs/tabs';
import {Login} from '../login/login'
import {Registro} from '../registro/registro'
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
/**
 * Generated class for the Chat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {
  user=false;
  storageRef:any;
  logoCara:any;
  logoChat:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,@Inject(FirebaseApp) firebaseApp: firebase.app.App,
  ) {
    this.storageRef = firebaseApp.storage().ref();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Chat');
    if(localStorage.getItem('user_uid')){
      this.user=true;
    }else{
      this.user=false;

    }
  }
  ionViewDidEnter(){
    if(localStorage.getItem('user_uid')){
      this.user=true;
    }else{
      this.user=false;

    }
    this.storageRef.child('chatting.png').getDownloadURL()
      .then(url => this.logoChat = url)
      .catch(error=>console.log(error));
    this.storageRef.child('triste3.png').getDownloadURL()
      .then(url => this.logoCara = url)
      .catch(error=>console.log(error));
  }

  irALogin(){
    this.navCtrl.push(Login);
  }
  irARegistro(){
    this.navCtrl.push(Registro);

  }
}
