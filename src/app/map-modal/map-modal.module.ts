import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModalComponent } from './map-modal.component';
import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
  ],
  declarations: [
    MapModalComponent,
  ],
  providers: [
    GoogleMaps
  ]
})
export class MapModalModule { }
