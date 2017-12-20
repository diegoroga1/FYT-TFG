import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
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
import { Toast } from '@ionic-native/toast';
import {Platform} from "ionic-angular";
declare var google;
/**
 * Generated class for the DetallesMapaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detalles-mapa',
  templateUrl: 'detalles-mapa.html',
})
export class DetallesMapaPage {
  datosLugares:any;
  @ViewChild('map2') mapElement:ElementRef;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams,public geolocation: Geolocation,
  public googleMaps: GoogleMaps,
  public platform:Platform) {
    this.datosLugares=this.navParams.data;
    console.log(this.datosLugares);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallesMapaPage');
    this.loadMap();

    console.log(GoogleMap)
  }

  ionViewDidEnter(){

  }
  loadMap() {
    let element=this.mapElement.nativeElement;
    /*let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };
*/
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
      .catch(error => {
        console.log("ERROR2 " + JSON.stringify(error));
      });
  }

}
