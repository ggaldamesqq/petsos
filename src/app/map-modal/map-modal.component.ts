import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng ,Marker} from '@ionic-native/google-maps';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent  implements OnInit {

  constructor(private modalController: ModalController, private geolocation: Geolocation, private googleMaps: GoogleMaps) { }

  ngOnInit() {
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   const latitud = resp.coords.latitude;
    //   const longitud = resp.coords.longitude;
  
    //   // Crea una instancia del mapa
    //   const map = this.googleMaps.create('map_canvas');
      
    //   // Configura el evento 'MAP_READY' para ejecutar código una vez que el mapa esté listo
    //   map.one(GoogleMapsEvent.MAP_READY).then(() => {
    //     // Centra el mapa en la ubicación actual
    //     map.animateCamera({
    //       target: new LatLng(latitud, longitud),
    //       zoom: 14
    //     });
  
    //     // Agrega un marcador en la ubicación actual
    //     const marker: Marker = map.addMarkerSync({
    //       position: new LatLng(latitud, longitud),
    //       title: 'Ubicación actual',
    //       snippet: 'Aquí estoy'
    //     });
    //   });
    // }).catch((error) => {
    //   console.log('Error al obtener la ubicación', error);
    // });
  }

}
