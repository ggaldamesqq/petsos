import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarPublicacionComponent } from './editar-publicacion.component';

@NgModule({
  declarations: [
    EditarPublicacionComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    EditarPublicacionComponent
  ]
})
export class EditarPublicacionModule { }