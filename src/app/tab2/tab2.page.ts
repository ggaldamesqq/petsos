import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  markers: Marker[] = [
    {
      position: {
        lat: -33.4170258,
        lng: -70.6055206,
      },
      title: 'Costanera Center'
    },
    {
      position: {
        lat: -33.4200929,
        lng: -70.6128194226865,
      },
      title: 'Parque de las esculturas'
    },
    {
      position: {
        lat: -33.42862,
        lng: -70.6195459,
      },
      title: 'Metro Manuel Montt'  	 	
    },
  ];

  map = null ;

  ngOnInit() {
    this.loadMap();
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

}