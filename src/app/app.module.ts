import { NgModule, ErrorHandler,ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Http,Response ,HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {Entrenadores} from '../pages/entrenadores/entrenadores'
import {Inicio} from '../pages/inicio/inicio'
import {Perfil} from '../pages/perfil/perfil'
import {Chat} from '../pages/chat/chat'
import { Tabs } from '../pages/tabs/tabs';

import { DataTrainer } from '../providers/data-trainer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Entrenadores,
    Inicio,
    Perfil,
    Chat,
    Tabs
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Entrenadores,
    Inicio,
    Perfil,
    Chat,
    Tabs
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataTrainer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
