import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CorreoService } from '../correo.service';
import { AlertController } from '@ionic/angular';


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

  publicaciones: any[] = [];
  constructor(private alertController: AlertController,private http:HttpClient, private correoService: CorreoService,private navCtrl: NavController) {}
  ngOnInit() {
    const emailLS = localStorage.getItem('email');
    console.log(emailLS);

    if (emailLS) {
      this.MostrarDatos(emailLS);
      this.MostrarPublicaciones(emailLS);

      console.log("entra en emails")
    } else {
      const email = this.correoService.correo;
      localStorage.clear(); // Limpiar todos los datos en localStorage
      localStorage.setItem('email', email);
      console.log("entra en el otro")

      this.MostrarDatos(email);
      this.MostrarPublicaciones(email);
    }
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
        },
        err => {
          // this.mostrarAlerta(JSON.stringify(err.error), "Error");
        }
      );
  }
  MostrarPublicaciones(email: string) {
    this.http.post('https://lhqt1569u5.execute-api.us-east-1.amazonaws.com/desa', { correo:email })
      .subscribe(
        (res: any) => {
          console.log(res);
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
  async mostrarAlerta(mensaje: string, header:string) {
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}

