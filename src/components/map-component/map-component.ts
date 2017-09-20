import { Component,ViewChild,ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
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
import { Toast } from '@ionic-native/toast';
declare var google;
@Component({
  selector: 'map-component',
  templateUrl: 'map-component.html'
})
export class MapComponent {
  @ViewChild('map') mapElement: ElementRef;
input:any;
  text: string;
  map: GoogleMap;
  myPosition: any = {};
  address:any;
  markers2:any;
  markers:any;
  pos:any;
  geocoder:any;
  autocomplete:any;
  constructor(public geolocation: Geolocation,
                 private googleMaps: GoogleMaps) {
    console.log('Hello MapComponent Component');
    console.log(this.mapElement)
    this.text = 'Hello World';
    this.getCurrentPosition();

  }
  ionViewDidLoad(){
    this.getCurrentPosition();
  }
  ionViewWillEnter(){
    this.getCurrentPosition();

  }
  getCurrentPosition(){
    this.geolocation.getCurrentPosition()
      .then(position => {
        this.myPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        console.log(this.myPosition)
        this.loadMap();
      })
      .catch(error=>{
        console.log(error);
      })
  }

  loadMap(){
    let latLng = new google.maps.LatLng(this.myPosition.latitude, this.myPosition.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.Satellite,
      fullscreenControl: true,
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.input=document.getElementById('input');
    console.log(this.input);

    this.autocomplete = new google.maps.places.Autocomplete(this.input);
    this.autocomplete.bindTo('bounds', this.map);
    this.addMiUbicacion()
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

  getCoords() {
    // Creamos el objeto geodecoder
   this.geocoder = new google.maps.Geocoder();
    if (this.address != '') {
      this.address=this.autocomplete.getPlace().name
      // Llamamos a la función geodecode pasandole la dirección que hemos introducido en la caja de texto.
      this.geocoder.geocode({'address': this.address}, (results,status)=> {
        if (status == 'OK') {
// Mostramos las coordenadas obtenidas en el p con id coordenadas
          document.getElementById("coordenadas").innerHTML = 'Coordenadas:   ' + results[0].geometry.location.lat() + ', ' + results[0].geometry.location.lng();
// Posicionamos el marcador en las coordenadas obtenidas
          this.pos=new google.maps.LatLng( results[0].geometry.location.lat(),  results[0].geometry.location.lng())
          this.markers2=new google.maps.Marker({
            map:this.map,
            animation:google.maps.Animation.DROP,
            position: new google.maps.LatLng( results[0].geometry.location.lat(),  results[0].geometry.location.lng()),
          });
// Centramos el mapa en las coordenadas obtenidas
        }
      });
    }
  }
  addMarker(pos){
    new google.maps.Marker({
      map:this.map,
      animation:google.maps.Animation.DROP,
      position: pos,
    });
  }
}
