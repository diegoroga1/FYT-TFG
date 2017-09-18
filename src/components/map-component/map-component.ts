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
  text: string;
  map: GoogleMap;
  myPosition: any = {};
  markers: any[] = [
    {
      position:{
        latitude: -17.3666745,
        longitude: -66.2387878,
      },
      title:'Point 1'
    },
    {
      position:{
        latitude: -17.3706884,
        longitude: -66.2397749,
      },
      title:'Point 2'
    },
    {
      position:{
        latitude: -17.391398,
        longitude: -66.2407904,
      },
      title:'Point 3'
    },
    {
      position:{
        latitude: -17.3878887,
        longitude: -66.223664,
      },
      title:'Point 4'
    },
  ];
  constructor(private geolocation: Geolocation,
                 private googleMaps: GoogleMaps) {
    console.log('Hello MapComponent Component');
console.log(this.mapElement)
    this.text = 'Hello World';
    this.getCurrentPosition();

  }
  ionViewDidLoad(){

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
      fullscreenControl: true

    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
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

}
