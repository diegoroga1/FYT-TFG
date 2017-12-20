import { Component,ViewChild,ElementRef,Input,Inject} from '@angular/core';
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
@Component({
  selector: 'map-component',
  templateUrl: 'map-component.html'
})
export class MapComponent {
  @ViewChild('map') mapElement:ElementRef;
  @Input('lugares') lugares:any;
input:any;
  options : GeolocationOptions;
  currentPos : Geoposition;
  text: string;
  map: GoogleMap;
  myPosition: any = {};
  address:any;
  markers2:any;
  markers:any;
  pos:any;
  geocoder:any;
  autocomplete:any;
  coordenadas=[];
  constructor(public geolocation: Geolocation,
                 public googleMaps: GoogleMaps,
              public platform:Platform) {
    console.log('Hello MapComponent Component');
    this.text = 'Hello World';

   // this.getCurrentPosition();
  }
  ngOnInit(){

    if(this.lugares){
      this.lugares.forEach(item=>{
        this.coordenadas.push(item);

      })
    }
   // this.getCurrentPosition();
  }
  ionViewCanLeave(){
    console.log("Hola");
  }
  ngAfterViewInit(){
    this.loadMap()
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

  setMarkers(){
    console.log(this.coordenadas);
    this.coordenadas.forEach(coord=>{
      console.log(coord);
      this.map.addMarker({
        title: coord.nombre,
        animation: 'DROP',
        center:this.myPosition,
        icon:'blue',
        position: {lat:coord.coords.lat,lng:coord.coords.lng},

      })

    })

  }
/*
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
  }*//*
  addMarker(pos){
    new google.maps.Marker({
      map:this.map,
      animation:google.maps.Animation.DROP,
      position: pos,
    });
  }*/
}
