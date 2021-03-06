import { Component,ViewChild,enableProdMode  } from '@angular/core';
import {Platform, ToastController, AlertController, NavController} from 'ionic-angular';
import  {Keyboard} from '@ionic-native/keyboard'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Entrenadores } from '../pages/entrenadores/entrenadores';
import { HomePage } from '../pages/home/home';
import { Tabs } from '../pages/tabs/tabs';
import { Chat } from '../pages/chat/chat';
import { Perfil } from '../pages/perfil/perfil';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') navCtrl: NavController;

  rootPage:any = Tabs;
  constructor(platform: Platform,statusBar: StatusBar, public splashScreen: SplashScreen,public keyboard:Keyboard) {
    platform.ready().then(() => {
      setTimeout(() => {
        splashScreen.hide();
      }, 100);
      this.keyboard.onKeyboardShow().subscribe(()=>{
        let tab=document.getElementsByClassName('tabbar')
        tab[0].classList.remove('show-tabbar')

      })
      this.keyboard.onKeyboardHide().subscribe(()=>{
        let tab=document.getElementsByClassName('tabbar')
        tab[0].classList.add('show-tabbar')

      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

    });
  }


}

