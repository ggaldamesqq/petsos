import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  searchTerm = '';
  allPublications: any[];
  filterPublications() {
    if (this.searchTerm.trim() === '') {
      this.publicaciones = this.allPublications;
    } else {
      this.publicaciones = this.allPublications.filter(publicacion => {
        return publicacion.titulo.toLowerCase().includes(this.searchTerm.toLowerCase())
          || publicacion.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
          || publicacion.tipo.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  }
  
  publicaciones = [
    {
      id: 1,
      titulo: 'Perro perdido',
      especie: 'Perro',
      raza: 'Labrador Retriever',
      nombre:'Max',
      tipo: 'Mascota Perdida',
      descripcion: 'Se ha perdido un perro de raza Labrador Retriever en la comuna de Providencia, Santiago. Es de color chocolate, de tamaño mediano y tiene un collar azul con una placa de identificación. Responde al nombre de Max. Se perdió cerca del Parque Balmaceda el 20 de mayo. Si tienes alguna información, por favor, contáctanos. Se ofrece una recompensa.',
      imagen: 'https://humanidades.com/wp-content/uploads/2017/02/perro-1-e1561678907722.jpg',
      direccion: 'Avenida Providencia',
      contacto:''
      
    }
    // Agrega más objetos de publicación según tus necesidades
  ];

  constructor(private http:HttpClient) {
    this.allPublications = this.publicaciones;
   }
   mostrarPinsPublicacion() {
    const mostrar = {};
    this.http
      .post('https://m50a5vjuy9.execute-api.us-east-1.amazonaws.com/desa', mostrar)
      .subscribe(
        (res: any) => {
          console.log(res);
          const responseBody = JSON.parse(res.body);

          if (responseBody.pinsMapa) {
            const pinsMapa = responseBody.pinsMapa;
            console.log(pinsMapa);

            this.publicaciones = [...this.publicaciones, ...pinsMapa];
          }
        },
        err => {
          console.error('Error al enviar la publicación:', err);
        }
      );

    console.log('Datos de la publicación:', mostrar);
  }
  ngOnInit() {
    this.mostrarPinsPublicacion();
  }

}
