import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
  })
  export class Tab1Page {
  nombre: string = 'Juan';
  apellido: string = 'Pérez';
  anioNacimiento: number = 1990;
  direccion: string = 'Calle Falsa 123';
  email: string = 'juan.perez@gmail.com';
  telefono: string = '1234567890';
  idioma: string = 'Español';
  publicaciones: any[] = [
    {
      titulo: 'Perro Labrador encontrado',
      categoria: 'Animal Perdido',
      ubicacion: 'Providencia',
      visualizaciones: 1234,
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Labrador_Retriever_%281210559%29.jpg',
    },
    {
      titulo: 'Gato Siames encontrado',
      categoria: 'Animal Perdido',
      ubicacion: 'Las Condes',
      visualizaciones: 5678,
      imagen: 'https://www.vitapets.cl/wp-content/uploads/2021/01/siames-original.jpg',
    },
    {
      titulo: 'Perro Cocker Spaniel encontrado',
      categoria: 'Animal Perdido',
      ubicacion: 'Vitacura',
      visualizaciones: 9012,
      imagen: 'https://www.bunko.pet/__export/1611884880111/sites/debate/img/2021/01/28/10_curiosidades_sobre_los_perros_cocker_spaniel_que_tal_vez_no_sabxas_crop1611884841022.jpeg_423682103.jpeg',
    },
  ];

  

  constructor(private navCtrl: NavController) {}

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

