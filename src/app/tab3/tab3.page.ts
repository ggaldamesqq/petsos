import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public publicacionForm: FormGroup;
  ubicacionValue: string = '';
  markerPosition: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalController: ModalController
  ) {
    this.publicacionForm = this.formBuilder.group({
      ubicacion: ['', Validators.required],
      selectedFile: ['', Validators.required],
      titulo: ['', Validators.required],
      description: ['', Validators.required],
      categoria: ['option1'] // Valor por defecto
    });
  }

  async abrirMapaModal() {
    const modal = await this.modalController.create({
      component: MapModalComponent,
      cssClass: 'map-modal',
      componentProps: {
        ubicacion: this.markerPosition
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log('Datos seleccionados:', data);

    if (data && data.ubicacion) {
      this.publicacionForm.patchValue({ ubicacion: data.ubicacion });
      this.ubicacionValue = `${data.ubicacion.lat}, ${data.ubicacion.lng}`;
      this.markerPosition = data.ubicacion;
    }
  }

  async obtenerUbicacionActual() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.ubicacionValue = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;

    this.publicacionForm.patchValue({ ubicacion: this.ubicacionValue });
    this.markerPosition = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
  }

  public publicar(): void {
    // Código para crear publicacion
  }

  ngOnInit() {}
}


