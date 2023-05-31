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

import { MapModalModule } from './map-modal/map-modal.module'; 
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AppComponent,EditarPerfilComponent],
  imports:   [MapModalModule,FormsModule, HttpClientModule, BrowserModule, IonicModule.forRoot({innerHTMLTemplatesEnabled: true}), AppRoutingModule, ReactiveFormsModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Storage],
  bootstrap: [AppComponent],
})
export class AppModule {}
