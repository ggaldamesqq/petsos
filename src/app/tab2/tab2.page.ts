import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var google: any;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  markers: Marker[] = [];
  constructor(private http:HttpClient) {}

  // markers: Marker[] = [
  //   {
  //     position: {
  //       lat: -33.4170258,
  //       lng: -70.6055206,
  //     },
  //     title: 'Costanera Center'
  //   },
  //   {
  //     position: {
  //       lat: -33.4200929,
  //       lng: -70.6128194226865,
  //     },
  //     title: 'Parque de las esculturas'
  //   },
  //   {
  //     position: {
  //       lat: -33.42862,
  //       lng: -70.6195459,
  //     },
  //     title: 'Metro Manuel Montt'  	 	
  //   },
  // ];

  map = null ;

  ngOnInit() {
    this.loadMap();
    this.MostrarPinsPublicacion();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map')!;
    // create LatLng object
    const myLatLng = {lat: -33.43107, lng: -70.60454};
    // create map 
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      // this.renderMarkers();
      mapEle.classList.add('show-map');
      this.renderMarkers();
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  MostrarPinsPublicacion() {
    var mostrar = {}
    this.http
      .post('https://m50a5vjuy9.execute-api.us-east-1.amazonaws.com/desa', mostrar)
      .subscribe(
        (res: any) => {
          console.log(res);
          let responseBody = JSON.parse(res.body);

        if (responseBody.pinsMapa) {
          const pinsMapa = responseBody.pinsMapa;
          this.markers = this.convertirMarcadores(pinsMapa);
          this.renderMarkers();
          console.log(pinsMapa);
        }
        },
        err => {
          console.error('Error al enviar la publicación:', err);
        }
      );
  
    console.log('Datos de la publicación:', mostrar);
  }
  convertirMarcadores(pinsMapa: any[]): Marker[] {
    return pinsMapa.map((pin: any) => ({
      position: {
        lat: parseFloat(pin.latitud) || 0,
        lng: parseFloat(pin.longitud) || 0
      },
      title: pin.titulo
    }));
  }


}