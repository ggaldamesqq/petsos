import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent implements OnInit {
  nombre: string = "";
  apellido: string = "";
  correo: string = "";
  contacto: number = 0;
  perfilId: string = ""; 

  constructor(private router: Router,private route: ActivatedRoute,private http:HttpClient,private alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.perfilId = params['id'];
      console.log(this.perfilId);
      
      this.MostrarDatosPerfil(this.perfilId);
      
      // Aquí puedes realizar acciones según el ID del pnerfil que se desea editar
    });
  }

  MostrarDatosPerfil(id: string) {
    this.http.post('https://yhjt3qu4ai.execute-api.us-east-1.amazonaws.com/desa', { id:id })
      .subscribe(
        (res:any) => {
          console.log(res);
          let responseBody = JSON.parse(res.body);
         console.log(responseBody);
         this.nombre = responseBody.nombre;
         this.apellido = responseBody.apellido;
         this.contacto = responseBody.ntelefono;
         this.correo = responseBody.correo;
        },
        err => {
          // this.mostrarAlerta(JSON.stringify(err.error), "Error");
        }
      );
  }
  guardarPerfil() {
    // Aquí puedes acceder a los datos del formulario
    console.log('Nombre:', this.nombre);
    console.log('Apellido:', this.apellido);
    console.log('Correo:', this.correo);
    console.log('Contacto:', this.contacto);
    this.perfilId;
    this.ActualizarDatosPerfil(this.perfilId,this.nombre,this.apellido,this.contacto)
    // Puedes realizar las acciones de guardado o actualización del perfil aquí
  }


  ActualizarDatosPerfil(id: string, nombre:string, apellido:string, contacto:number) {
    this.http.post('https://foix5pdnbc.execute-api.us-east-1.amazonaws.com/desa', { id:id, nombre:nombre, apellido:apellido, telefono:contacto })
      .subscribe(
        (res:any) => {
          console.log(res);
          let responseBody = JSON.parse(res.body);
          console.log(responseBody);
          this.mostrarAlerta(JSON.stringify(responseBody.message), "¡Correcto!");

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
    window.location.reload();
    this.router.navigateByUrl('/tabs/tab1');
  }
}