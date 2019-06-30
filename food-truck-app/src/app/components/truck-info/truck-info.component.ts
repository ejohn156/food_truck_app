import { Component, OnInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { environment } from '../../../environments/environment'
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.css']
})
export class TruckInfoComponent implements OnInit {
  @Input() truck: any 
  image: string
  map: mapboxgl.Map;
  constructor() { }

  ngOnInit() {
    console.log(this.truck)
    this.image = this.truck.image
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: AppComponent.style,
      center: [this.truck.long, this.truck.lat], // [lng, lat]
      zoom: 15, // starting zoom
      scrollZoom: false,
    });
    this.map.on('load', (event) => {
      this.map.addSource('customMarker', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
      const data = {
        
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [String(this.truck.long), String(this.truck.lat)]
            },
            properties: {
              message: this.truck.name,
              id: this.truck.id,
            }
          
        }
        console.log(data)
        this.map.getSource('customMarker').setData(data)

        this.map.addLayer({
          id: 'customMarkerid',
          source: 'customMarker',
          type: 'symbol',
          layout: {
            'text-field': '{message}',
            'text-size': 13,
            'text-transform': 'uppercase',
            'icon-image': 'marker-15',
            'text-offset': [0, 1.5]
          },
          paint: {
            'text-color': '#f16624',
            'text-halo-color': '#fff',
            'text-halo-width': 2
          },
        });
  })
}

}
