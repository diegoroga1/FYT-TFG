import { Component,ViewChild,ElementRef } from '@angular/core';
import {IonicPage, NavController, ViewController, NavParams, Platform} from 'ionic-angular';
import {MapComponent} from '../../components/map-component/map-component'
import {CrearAnuncio} from '../crear-anuncio/crear-anuncio';
import { Geolocation} from '@ionic-native/geolocation';
import { AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Geocoder,
  GeocoderRequest,
  GeocoderResult,
} from '@ionic-native/google-maps';
/**
 * Generated class for the VistaMapa page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-vista-mapa',
  templateUrl: 'vista-mapa.html',
})
export class VistaMapa {
  @ViewChild('mapa') mapElement:ElementRef;
  map: GoogleMap;
  myPosition:any;
  inputPlace:any;
  auto:any;
  localidad:any;
  markers:any;
  lugares=[];
  lugaresEntrenador=[];
  coordenadas=[];
  userKey;
  constructor(public navCtrl: NavController,public af:AngularFireDatabase,public viewCtrl:ViewController, public navParams: NavParams,public geolocation: Geolocation,
  private googleMaps: GoogleMaps,public platform:Platform) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VistaMapa');
    this.inputPlace=document.getElementById('auto-input');
    this.auto = new google.maps.places.Autocomplete(this.inputPlace);
    this.auto.addListener('place_changed', (data=> {
      this.localidad=this.auto.getPlace()
    }))

  }
  ionViewDidEnter(){
    this.userKey=this.navParams.data;
    console.log("USERKEY"+this.userKey);
    this.af.object('entrenadores/'+this.userKey+'/servicio/lugares').forEach(lugares=>{
      console.log(lugares);
      if(lugares.length>0){

        this.lugaresEntrenador.push(lugares);
        console.log('Array lugares '+ this.lugaresEntrenador);
        lugares.forEach(item=>{
          this.coordenadas.push(item);
          console.log('item ' + item);
        })
      }

    });
    if(localStorage.getItem('lugares')){
      this.lugares=JSON.parse(localStorage["lugares"])
    }  }

  setMarkers(){
    this.coordenadas.forEach(coord=>{
      let latLng = new google.maps.LatLng(coord.coords.lat, coord.coords.lng);
      this.map.addMarker({
        animation:'BOUNCE',
        position:{lat:coord.coords.lat,lng: coord.coords.lng},
        title:coord.nombre,
        icon: 'blue',
      })
    })

  }
  getPosition(): void{
    this.map.getMyLocation()
      .then(response => {
        console.log(JSON.stringify(response));
        this.map.moveCamera({
          target: response.latLng
        });

        this.map.addMarker({
          title: 'Mi posición',
          icon: 'red',
          animation: 'DROP',
          position: response.latLng
        });
        this.myPosition={
          lat:response.latLng.lat,
          long:response.latLng.lng
        }
      }).then(marker=>{
      this.map.setCameraZoom(12)
    })
      .catch(error =>{
        console.log(JSON.stringify("ERROR1 "+ error));
      });
  }
  loadMap(){
    let element=this.mapElement.nativeElement;

    this.map = GoogleMaps.create(element);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // Now you can use all methods safely.
        this.getPosition();
        console.log("MAP READY")
        this.setMarkers()

      })

      .catch(error =>{
        console.log("ERROR2 "+JSON.stringify(error) );
      });

  }

  addMarker(){
    console.log(this.localidad);
      this.createMarker(this.localidad.geometry.location,this.localidad.name);
      this.localidad.address_components.forEach(data=>{
        data.types.forEach(tipo=>{
          if(tipo=="locality"){
            this.lugares.push({'nombre':this.localidad.name +' - '+data.short_name,'coords':this.localidad.geometry.location})
          }
        })
      })

  }

  createMarker(pos,name){
    this.map.addMarker({
      animation:'BOUNCE',
      position:pos,
      icon:'blue',
      title:name
    })

  }
  guardarLugares(){
    localStorage["lugares"] = JSON.stringify(this.lugares);
    this.navCtrl.pop();
  }
  clearInput(){
    this.inputPlace.value="";
  }

}
