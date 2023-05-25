import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { MapModalModule } from './map-modal/map-modal.module'; 

@NgModule({
  declarations: [AppComponent],
<<<<<<< HEAD
  imports:   [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Storage],
  bootstrap: [AppComponent],
=======
  imports: [
    MapModalModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage,
    Geolocation
  ],
  bootstrap: [AppComponent]
>>>>>>> da27e3814bb3279d289914360322c108a0e37f43
})
export class AppModule {}

