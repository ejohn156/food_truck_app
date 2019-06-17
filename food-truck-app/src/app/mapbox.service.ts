import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Store, select } from '@ngrx/store';

import * as mapboxgl from 'mapbox-gl';
@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }
  static getMarkers(trucks) {
    let geoJson = []
    trucks.map(truck => {
      const truckGeoJson = {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [String(truck.long), String(truck.lat)]
        },
        'properties': {
          'message': truck.name,
          'id': truck.id
        }
      }
      geoJson.push(truckGeoJson)
    })
    return geoJson;


  }
}
