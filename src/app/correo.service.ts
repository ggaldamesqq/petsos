import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {
  correo: string = '';

  constructor() { }
  limpiarCorreo() {
    this.correo = '';
  }
}