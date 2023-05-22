import { Component, OnInit } from '@angular/core';

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
      imagenUrl: 'https://humanidades.com/wp-content/uploads/2017/02/perro-1-e1561678907722.jpg',
      direccion: 'Avenida Providencia',
      region:'Metropolitana',
      comuna:'Providencia'
    },
    {
      id: 2,
      titulo: 'Perros abandonados en esquina',
      especie: 'Perro',
      raza: '',
      nombre: '',
      tipo: 'Animales en abandono',
      descripcion: 'Se ha reportado la presencia de un grupo de perros en situación de abandono en la esquina de la calle principal. Los perros, que incluyen un Labrador Retriever, un mestizo, un Bulldog Francés y otro de raza desconocida, se encuentran en un estado preocupante. Presentan signos evidentes de desnutrición, pelaje descuidado y sucio, y algunos tienen heridas y cicatrices visibles',
      imagenUrl : 'https://www.chiledesarrollosustentable.cl/wp-content/uploads/2020/01/perro-abandonado.jpg',
      direccion:'Avenida Independencia 1234',
      region:'Metropolitana',
      comuna:'Conchalí'
    },
    // Agrega más objetos de publicación según tus necesidades
  ];

  constructor() {
    this.allPublications = this.publicaciones;
   }

  ngOnInit() {
  }

}
