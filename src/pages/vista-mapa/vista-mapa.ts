import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController,ViewController,NavParams } from 'ionic-angular';
import {MapComponent} from '../../components/map-component/map-component'
import {CrearAnuncio} from '../crear-anuncio/crear-anuncio';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';

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
  @ViewChild('mapa') mapElement: ElementRef;
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
  private googleMaps: GoogleMaps) {
    this.getCurrentPosition()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VistaMapa');
    this.inputPlace=document.getElementById('auto-input');
    this.auto = new google.maps.places.Autocomplete(this.inputPlace);
    this.auto.addListener('place_changed', (data=> {
      console.log(data);
      this.localidad=this.auto.getPlace()
    }))
    this.getCurrentPosition();

  }
  ionViewDidEnter(){
    this.getCurrentPosition();
    console.log("entro");
  }

  ionViewWillEnter(){
    this.userKey=this.navParams.data;
    console.log(this.userKey);
    this.af.object('entrenadores/'+this.userKey+'/servicio/lugares').forEach(lugares=>{

      this.lugaresEntrenador.push(lugares);
      console.log(this.lugaresEntrenador);
      lugares.forEach(item=>{
        this.coordenadas.push(item.coords);
        console.log(this.coordenadas);

      })
    });
    this.getCurrentPosition();
    if(localStorage.getItem('lugares')){
      this.lugares=JSON.parse(localStorage["lugares"])
    }

    console.log(this.lugares);


  }
  setMarkers(){
    this.coordenadas.forEach(coord=>{

      console.log(coord.lat,coord.lng);
      let latLng = new google.maps.LatLng(coord.lat, coord.lng);
      console.log(latLng)
      let marker=new google.maps.Marker({
        map:this.map,
        animation:google.maps.Animation.BOUNCE,
        position:latLng,
        icon: '../../assets/icon/mancuerna.png',
      })
      console.log(marker);
      marker.setMap(this.map);
    })


  }
  getCurrentPosition(){

    console.log("Entro de position")
    this.geolocation.watchPosition()
      .subscribe(position => {
        this.myPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        console.log(this.myPosition)
        this.loadMap();
      })

  }
  loadMap(){
    let latLng = new google.maps.LatLng(this.myPosition.latitude, this.myPosition.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.Satellite,
      fullscreenControl: true,
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.addMiUbicacion()
    this.setMarkers();

  }
  addMiUbicacion(){
    console.log(this.geolocation.getCurrentPosition());
    this.markers = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(this.myPosition.latitude, this.myPosition.longitude),
    });
    let content = "<h4>Information!</h4>";
  }
  addMarker(){
      this.createMarker(this.localidad.geometry.location);
      console.log(this.localidad)
      this.localidad.address_components.forEach(data=>{
        data.types.forEach(tipo=>{
          if(tipo=="locality"){
            console.log(data.short_name);
            this.lugares.push({'nombre':this.localidad.name +' - '+data.short_name,'coords':this.localidad.geometry.location})
          }
        })
      })

  }

  createMarker(pos){
    console.log(pos);
    let marker=new google.maps.Marker({
      map:this.map,
      animation:google.maps.Animation.BOUNCE,
      position:pos
    })
    let mapOptions={
      center:pos,
      zoom:15
    }
    this.map.setOptions(mapOptions)

    marker.setMap(this.map);

  }
  guardarLugares(){
    localStorage["lugares"] = JSON.stringify(this.lugares);
    this.navCtrl.pop();
  }
  clearInput(){
    console.log(this.inputPlace);
    console.log(this.inputPlace.value);
    this.inputPlace.value="";
  }

}
