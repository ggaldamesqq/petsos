import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

declare var google: any;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
  imagen: string;
  descripcion:string;
  contacto:string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  markers: Marker[] = [];
  map = null;

  constructor(private http: HttpClient, private alertController: AlertController) { }

  ngOnInit() {
    this.loadMap();
    this.mostrarPinsPublicacion();
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map')!;
    const myLatLng = { lat: -33.43107, lng: -70.60454 };
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }

  addMarker(marker: Marker) {
    const googleMarker = new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });

    // Agregar evento 'click' al marcador
    googleMarker.addListener('click', () => {
      this.showMarkerInfo(marker);
    });

    return googleMarker;
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
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
      title: pin.titulo,
      descripcion:pin.descripcion,
      imagen: pin.imagen,
      contacto:pin.contacto
    }));
  }

  async showMarkerInfo(marker: Marker) {
    const alert = await this.alertController.create({
      header: marker.title,
      message: 
        `<p>${marker.descripcion}</p>
        <p>${marker.contacto}</p>
        <img src="${marker.imagen}">`,

      buttons: ['OK']
    });

    await alert.present();
  }
}
