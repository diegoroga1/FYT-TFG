import { Component ,Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tabs } from '../tabs/tabs';
import {Login} from '../login/login'
import {Registro} from '../registro/registro'
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Chat');
    if(localStorage.getItem('user_uid')){
      this.user=true;
    }else{
      this.user=false;

    }
  }
  irALogin(){
    this.navCtrl.push(Login);
  }
  irARegistro(){
    this.navCtrl.push(Registro);

  }
}
