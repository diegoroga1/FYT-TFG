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
   // this.getCurrentPosition();

  }
  ionViewDidEnter(){
    this.userKey=this.navParams.data;
    this.af.object('entrenadores/'+this.userKey+'/servicio/lugares').forEach(lugares=>{
      if(lugares.$value!=null){
        this.lugaresEntrenador.push(lugares);
        lugares.forEach(item=>{
          this.coordenadas.push(item.coords);

        })
      }

    });
  //  this.getCurrentPosition();
    if(localStorage.getItem('lugares')){
      this.lugares=JSON.parse(localStorage["lugares"])
    }  }

  setMarkers(){
    this.coordenadas.forEach(coord=>{
      let latLng = new google.maps.LatLng(coord.lat, coord.lng);
      let marker=new google.maps.Marker({
        map:this.map,
        animation:google.maps.Animation.BOUNCE,
        position:latLng,
        icon: '../../assets/icon/mancuerna.png',
      })
      marker.setMap(this.map);
    })

  }
  getCurrentPosition(){

    this.geolocation.getCurrentPosition()
      .then((position) => {
        this.myPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.loadMap();
      }).catch(err=>console.log("ERROR"+JSON.stringify(err)));


  }
  loadMap(){
    let element=this.mapElement.nativeElement;

    //this.mapElement=document.getElementById('mapa');
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create(element);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // Now you can use all methods safely.
        //this.getPosition();

        console.log("MAP READY")
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }

        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });
      })
      .catch(error =>{
        console.log("ERROR2 "+JSON.stringify(error) );
      });
    /*let latLng = new google.maps.LatLng(this.myPosition.latitude, this.myPosition.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.Satellite,
      fullscreenControl: true,
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.addMiUbicacion();
    this.setMarkers();*/

  }
  addMiUbicacion(){
    this.markers = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(this.myPosition.latitude, this.myPosition.longitude),
    });
    let content = "<h4>Information!</h4>";
  }
  addMarker(){
      this.createMarker(this.localidad.geometry.location);
      this.localidad.address_components.forEach(data=>{
        data.types.forEach(tipo=>{
          if(tipo=="locality"){
            this.lugares.push({'nombre':this.localidad.name +' - '+data.short_name,'coords':this.localidad.geometry.location})
          }
        })
      })

  }

  createMarker(pos){
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
    this.inputPlace.value="";
  }

}
