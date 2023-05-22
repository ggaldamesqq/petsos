import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaValidacionPageRoutingModule } from './pagina-validacion-routing.module';

import { PaginaValidacionPage } from './pagina-validacion.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaValidacionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PaginaValidacionPage]
})
export class PaginaValidacionPageModule {}
