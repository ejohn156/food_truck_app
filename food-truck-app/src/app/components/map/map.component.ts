import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { environment } from '../../../environments/environment'
import { MapboxService } from '../../mapbox.service'
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title = 'food-truck-app'
  map: mapboxgl.Map;
  constructor() {

  }



  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: AppComponent.style,
      center: [-80.84313, 35.2271], // [lng, lat]
      zoom: 14, // starting zoom
      scrollZoom: true,
    });
    this.map.on('load', (event) => {
      this.map.addSource('customMarker', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }


      });
      const markers = MapboxService.getMarkers();
      const data = {
        type: 'FeatureCollection',
        features: markers
      };
      this.map.getSource('customMarker').setData(data);

      this.map.addLayer({
        id: 'customMarketid',
        source: 'customMarker',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 24,
          'text-transform': 'uppercase',
          'icon-image': 'marker-15',
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      });
    })
  }
}
