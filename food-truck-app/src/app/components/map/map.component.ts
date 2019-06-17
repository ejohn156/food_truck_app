import { Component, OnInit, Input, SimpleChange, SimpleChanges } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { environment } from '../../../environments/environment'
import { MapboxService } from '../../mapbox.service'
import { AppComponent } from '../../app.component';
import {Router} from '@angular/router'
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title = 'food-truck-app'
  map: mapboxgl.Map;
  @Input() trucks: Array<any>
  @Input() isLoaded: Boolean
  truckMarkers: Array<any>
  
  constructor(private router: Router) {
    
  }

 

  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    // this.map = new mapboxgl.Map({
    //   container: 'map',
    //   style: AppComponent.style,
    //   center: [-80.84313, 35.2271], // [lng, lat]
    //   zoom: 18, // starting zoom
    //   scrollZoom: true,
    // });
  }
  ngOnChanges(changes: SimpleChanges){
    console.log(changes)
    this.mapSetup()
    
}
mapSetup(){
  mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: AppComponent.style,
      center: [-80.84313, 35.2271], // [lng, lat]
      zoom: 15, // starting zoom
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
      const markers = this.trucks
      console.log(markers)
      const data = {
        type: 'FeatureCollection',
        features: markers
      };
      this.map.getSource('customMarker').setData(data);

      this.map.addLayer({
        id: 'customMarkerid',
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
        },
      });
    })
    this.map.on('click', 'customMarkerid', event => {
        console.log(event.features[0].properties.id)
        this.router.navigate(['/truck/'+event.features[0].properties.id])
    })
}
}