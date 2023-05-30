import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
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
}
