import { Component,Input,Inject } from '@angular/core';
import {Ionic2RatingModule} from 'ionic2-rating';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
import {VistaPublicacion} from "../../pages/vista-publicacion/vista-publicacion";
import * as _ from 'lodash';

/**
 * Generated class for the CardPubli component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'card-publi',
  templateUrl: 'card-publi.html'
})
export class CardPubli {
  @Input('titulo') titulo:any;
  @Input('descripcion') descripcion:any;
  @Input('especialidad') especialidad:any;
  @Input('entrenador') entrenador:any;
  @Input('fotoPortada') fotoP:any;
  @Input('key') key:any;
  @Input('userKey') userKey:any;
  @Input('fecha') fecha:any;
  likes=0;
  text: string;


  constructor( @Inject(FirebaseApp) public firebaseApp: firebase.app.App,
              public af:AngularFireDatabase,public navCtrl:NavController) {
    console.log('Hello CardPubli Component');
    this.text = 'Hello World';
  }
  ngOnInit() {
    this.af.object('entrenadores/'+this.userKey).forEach(data=>{
      this.entrenador=data.nombre +' '+data.apellidos;

    })
    this.firebaseApp.storage().ref().child(this.userKey +'/'+this.key+'/foto-publi/foto1.jpg').getDownloadURL()
      .then(url => this.fotoP = url)
      .catch(error=>console.log(error));
    console.log(this.key);
    this.af.object('/publicaciones/'+this.key).forEach(data=>{
      this.likes=data.likes;
    })
  }
  setLike(){

  }
  getMyLikes(){

  }
  irAVistaPublicacion(e){
    console.log(e);
    if(!_.includes(e.srcElement.className,'icon')){
      var publicacion={'titulo':this.titulo,'descripcion':this.descripcion,'especialidad':this.especialidad,'entrenador':this.entrenador,
        'fotoPortada':this.fotoP,'key':this.key,'userKey':this.userKey,'fecha':this.fecha
      }
      this.navCtrl.push(VistaPublicacion,publicacion);
    }


  }


}
