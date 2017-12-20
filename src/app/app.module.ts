import { NgModule, ErrorHandler,ViewChild,enableProdMode} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NgProgressModule } from 'ng2-progressbar';
import  {Keyboard} from '@ionic-native/keyboard'

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
import {VistaEntrenador} from '../pages/vista-entrenador/vista-entrenador'
import {VistaPublicacion} from '../pages/vista-publicacion/vista-publicacion'
import {CrearPublicacion} from '../pages/crear-publicacion/crear-publicacion'
import {CrearAnuncio} from '../pages/crear-anuncio/crear-anuncio'
import {VistaMapa} from '../pages/vista-mapa/vista-mapa'
import {ResetPasswordPage} from '../pages/reset-password/reset-password'
import {Login} from '../pages/login/login';
import {Registro} from '../pages/registro/registro';
import {NuevaTarifa} from '../pages/nueva-tarifa/nueva-tarifa';
import {FiltrarEntrenadorPage} from '../pages/filtrar-entrenador/filtrar-entrenador';
import {NuevaValoracionPage} from "../pages/nueva-valoracion/nueva-valoracion";

import { VideoPlayer } from '@ionic-native/video-player';
import { VideoEditor } from '@ionic-native/video-editor';

import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Facebook } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, Geocoder } from '@ionic-native/google-maps';
import { Toast } from '@ionic-native/toast';

import { Ionic2RatingModule } from 'ionic2-rating';
import { DataTrainer } from '../providers/data-trainer';
import { CogerDatos} from '../providers/coger-datos';
import {CardTrainer} from '../components/card-trainer/card-trainer';
import {CardPubli} from '../components/card-publi/card-publi';
import {MapComponent} from '../components/map-component/map-component'
import * as _ from 'lodash';
import { OrdenarPipe } from '../pipes/ordenar/ordenar';
import {DetallesMapaPage} from "../pages/detalles-mapa/detalles-mapa";
import {File} from "@ionic-native/file";
import {SocialSharing} from "@ionic-native/social-sharing";
export const firebase={
  apiKey: "AIzaSyAmdijlzMaRzeXEmIcWTAImU8SgtCI1mTA",
  authDomain: "fytrainer-69aef.firebaseapp.com",
  databaseURL: "https://fytrainer-69aef.firebaseio.com",
  projectId: "fytrainer-69aef",
  storageBucket: "fytrainer-69aef.appspot.com",
  messagingSenderId: "179397221458"
}



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Entrenadores,
    Inicio,
    Perfil,
    Chat,
    Tabs,
    CardTrainer,
    CardPubli,
    VistaEntrenador,
    VistaPublicacion,
    MapComponent,
    CrearPublicacion,
    CrearAnuncio,
    VistaMapa,
    Registro,
    Login,
    NuevaTarifa,
    FiltrarEntrenadorPage,
    OrdenarPipe,
    NuevaValoracionPage,
    DetallesMapaPage,
    ResetPasswordPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Ionic2RatingModule,
    NgProgressModule
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Entrenadores,
    Inicio,
    Perfil,
    Chat,
    Tabs,
    CardTrainer,
    CardPubli,
    VistaEntrenador,
    VistaPublicacion,
    MapComponent,
    CrearPublicacion,
    CrearAnuncio,
    VistaMapa,
    Registro,
    Login,
    NuevaTarifa,
    FiltrarEntrenadorPage,
    NuevaValoracionPage,
    DetallesMapaPage,
    ResetPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataTrainer,
    CogerDatos,
    Geolocation,
    GoogleMaps,
    Geocoder,
    ViewChild,
    Toast,
    Camera,
    Facebook,
    GooglePlus,
    MediaCapture,
    File,
    VideoPlayer,
    SocialSharing,
    Keyboard,
    VideoEditor,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
