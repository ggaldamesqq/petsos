<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng ,Marker} from '@ionic-native/google-maps';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

=======
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;
>>>>>>> da27e3814bb3279d289914360322c108a0e37f43

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
<<<<<<< HEAD
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

=======
export class MapModalComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  private map: any;
  form: FormGroup;

  constructor(private navParams: NavParams, private modalController: ModalController) {
    this.form = new FormGroup({
      ubicacion: new FormControl('')
    });
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  async loadMap() {
    const mapEle: HTMLElement = this.mapElement.nativeElement;
    const coordinates = await Geolocation.getCurrentPosition();
    const myLatLng = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 10
    });

    const marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: 'Ubicación actual'
    });

    google.maps.event.addListener(this.map, 'click', (event: any) => {
      const selectedLatLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };

      this.form.controls['ubicacion'].setValue(selectedLatLng);

      marker.setPosition(selectedLatLng);
    });
  }

  dismiss() {
    const data = this.form.value;
    this.modalController.dismiss(data);
  }
>>>>>>> da27e3814bb3279d289914360322c108a0e37f43
}
