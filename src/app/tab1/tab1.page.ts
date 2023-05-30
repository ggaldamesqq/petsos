import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CorreoService } from '../correo.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
  })
  export class Tab1Page {

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  id: string = '';

  publicaciones: any[] = [
    {
      titulo: 'Perro Labrador encontrado',
      categoria: 'Animal Perdido',
      ubicacion: 'Providencia',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Labrador_Retriever_%281210559%29.jpg',
    },
    {
      titulo: 'Gato Siames encontrado',
      categoria: 'Animal Perdido',
      ubicacion: 'Las Condes',
      imagen: 'https://www.vitapets.cl/wp-content/uploads/2021/01/siames-original.jpg',
    },
    {
      titulo: 'Perro Cocker Spaniel encontrado',
      categoria: 'Animal Perdido',
      ubicacion: 'Vitacura',
      imagen: 'https://www.bunko.pet/__export/1611884880111/sites/debate/img/2021/01/28/10_curiosidades_sobre_los_perros_cocker_spaniel_que_tal_vez_no_sabxas_crop1611884841022.jpeg_423682103.jpeg',
    },
  ];
  constructor(private http:HttpClient, private correoService: CorreoService,private navCtrl: NavController) {}
  ngOnInit() {
    const email = this.correoService.correo;
    console.log(email);// Utiliza el valor del correo electrónico en la página según sea necesario
    this.iniciarSesion(email);
    // https://tw3gntca78.execute-api.us-east-1.amazonaws.com/desa
  }

  iniciarSesion(email: string) {
    this.http.post('https://tw3gntca78.execute-api.us-east-1.amazonaws.com/desa', { email:email })
      .subscribe(
        (res:any) => {
          console.log(res);
          let responseBody = JSON.parse(res.body);
         console.log(responseBody);
         this.nombre = responseBody.usuario;
         this.id = responseBody.id;
         this.email = responseBody.correo;
        },
        err => {
          // this.mostrarAlerta(JSON.stringify(err.error), "Error");
        }
      );
  }

  editarPerfil() {
    console.log('Editar perfil');
  }

  editarPublicacion(publicacion: any) {
    console.log('Editar publicación', publicacion);
  }

  eliminarPublicacion(publicacion: any) {
    console.log('Eliminar publicación', publicacion);
  }

}

