import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CorreoService } from '../correo.service';
import { AlertController } from '@ionic/angular';
import { response } from 'express';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
  })
  export class Tab1Page {

  nombre: string = '';
  usuario: string = '';
  apellido: string = '';
  email: string = '';
  contacto: string = '';
  id: string = '';
  tipo: string = '';

  publicaciones: any[] = [];
  constructor(private alertController: AlertController,private http:HttpClient, private router: Router, private correoService: CorreoService,private navCtrl: NavController) {}
  ngOnInit() {
    const emailLS = localStorage.getItem('email');
    const tipoLS = localStorage.getItem('tipo');
    
    console.log(emailLS);

    if (emailLS && tipoLS) {
      this.MostrarDatos(emailLS);
      this.MostrarPublicaciones(emailLS,tipoLS);

      console.log("entra en emails")
    } else {
      const email = this.correoService.correo;
      localStorage.clear(); // Limpiar todos los datos en localStorage
      localStorage.setItem('email', email);
      console.log("entra en el otro")

      this.MostrarDatos(email);
      // this.MostrarPublicaciones(email, tipoLS);
    }

    if (tipoLS) {
      this.tipo = tipoLS;
      
    } else {
      // Asigna un valor por defecto si no hay un valor en localStorage
      this.tipo = 'normal';
    }
    console.log(tipoLS);

  }

  MostrarDatos(email: string) {
    this.http.post('https://tw3gntca78.execute-api.us-east-1.amazonaws.com/desa', { email:email })
      .subscribe(
        (res:any) => {
          console.log(res);
          let responseBody = JSON.parse(res.body);
         console.log(responseBody);
         this.usuario = responseBody.usuario;
         this.nombre = responseBody.nombre;
         this.id = responseBody.id;
         this.email = responseBody.correo;
         this.apellido = responseBody.apellido;
         this.contacto = responseBody.ntelefono;
         this.tipo = responseBody.tipo;
         localStorage.setItem('tipo', this.tipo);
        },
        err => {
          // this.mostrarAlerta(JSON.stringify(err.error), "Error");
        }
      );
  }
  MostrarPublicaciones(email: string, tipo:string) {
    this.http.post('https://lhqt1569u5.execute-api.us-east-1.amazonaws.com/desa', { correo:email, tipo:tipo })
      .subscribe(
        (res: any) => {
          console.log(tipo);
          console.log(email);

          const responseBody = JSON.parse(res.body);
          const Publicacioness = responseBody.publicaciones;
          console.log(Publicacioness);
          this.publicaciones = Publicacioness.map((pub: { id: string, titulo: string, categoria: string, imagen: string }) => ({...pub, correo: email}));
      },
        err => {
          console.error(err);
        }
      );
  }
  editarPerfil() {
    const perfilId = this.id; // Obtén el ID del perfil que se desea editar
    // Navegar a la página de edición de perfil y pasar el ID a través de la URL
    this.navCtrl.navigateForward(`/editar-perfil/${perfilId}`);
  }

  editarPublicacion(publicacion: any) {
    console.log('Editar publicación', publicacion);
    const publicacionId = publicacion.id; // Obtén el ID de la publicación que se desea editar
    // Navegar a la página de edición de publicación y pasar el ID a través de la URL
    this.navCtrl.navigateForward(`/editar-publicacion/${publicacionId}`);
  }

  eliminarPublicacion(publicacion: any) {
    console.log('Eliminar publicación', publicacion);
    console.log('Correo de la persona que creó la publicación:', publicacion.correo);
    console.log('ID de la publicación:', publicacion.id);
    this.EliminarPublicacions(publicacion.correo,publicacion.id);
    
  }
 EliminarPublicacions(correo: string, id:number) {

  if (this.tipo == 'normal')
  {
    this.http.post('https://kym5gvwhda.execute-api.us-east-1.amazonaws.com/desa', {correo,id})
    .subscribe(
      (res:any) => {
        console.log(res);
        location.reload();
        // this.mostrarAlerta(JSON.stringify("Publicacion eliminada correctamente."), "Error");
      },
      err => {
        // this.mostrarAlerta(JSON.stringify(err.error), "Error");
      }
    );
  }
  else if (this.tipo == 'admin'){
    this.http.post('https://zvptepeu0f.execute-api.us-east-1.amazonaws.com/desa', {correo,id})
    .subscribe(
      (res:any) => {
        console.log(res);
        location.reload();
        // this.mostrarAlerta(JSON.stringify("Publicacion eliminada correctamente."), "Error");
      },
      err => {
        // this.mostrarAlerta(JSON.stringify(err.error), "Error");
      }
    );
  }
    
  }
  async mostrarAlerta(mensaje: string, header:string) {
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
  cerrarSesion(){
    this.router.navigate(['login']);
    localStorage.removeItem('email');
    localStorage.removeItem('tipo');
  }
}

