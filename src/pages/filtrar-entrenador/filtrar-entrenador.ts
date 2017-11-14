import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from "lodash";
import {FirebaseListObservable,AngularFireDatabase} from "angularfire2/database";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Geocoder,
  GeocoderRequest,
  GeocoderResult,
} from '@ionic-native/google-maps';
/**
 * Generated class for the FiltrarEntrenadorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-filtrar-entrenador',
  templateUrl: 'filtrar-entrenador.html',
})
export class FiltrarEntrenadorPage {
  precio1:any;
  precio2:any;
  filtros=[];
  especialidades:FirebaseListObservable<any>;
  especialidad:any;
  inputPlace:any;
  autocomplete:any;
  localidad:any;
  localidadInput:any
  genero:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public af:AngularFireDatabase,
  ) {
    this.especialidades=this.af.list('especialidades');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltrarEntrenadorPage');
  }
  ionViewDidEnter(){
    this.inputPlace=document.getElementById('input-place');
    this.autocomplete = new google.maps.places.Autocomplete(this.inputPlace);
    this.autocomplete.addListener('place_changed', (data=> {
      this.localidad=this.autocomplete.getPlace().name + ', '+this.autocomplete.getPlace().address_components[1].short_name;
      console.log(this.localidad);
    }))
  }
  aceptarFiltros(){
   var precios;
   console.log(this.precio1);
    if(this.precio1!=undefined&&this.precio2!=undefined){
      this.filtros.push({
        'precios':{
          'precio1':this.precio1,
          'precio2':this.precio2
        }
      })
    }
    if(this.especialidad!=undefined){
      this.filtros.push({
        'especialidades':this.especialidad
      })
    }
    if(this.localidad!=undefined){
      console.log(this.localidad);
      this.filtros.push({
        'localidad':this.localidad
      })

    }
    if(this.genero!=undefined){
      console.log(this.genero);
      this.filtros.push({
        'genero':this.genero
      })
    }
    if(this.filtros.length>0){
      localStorage.setItem('filtro',JSON.stringify(this.filtros));

    }else{
      if(localStorage.getItem('filtro')){
        localStorage.removeItem('filtro')
      }
    }

    console.log(this.genero);
    console.log(this.especialidad);
  this.navCtrl.pop();
  console.log(this.localidad);
  }

}
