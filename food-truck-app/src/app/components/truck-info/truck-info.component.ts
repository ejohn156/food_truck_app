import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { environment } from '../../../environments/environment'
import { AppComponent } from '../../app.component';
import { Store, select } from '@ngrx/store';
import * as FavoriteStore from '../../store/action';
import { Favorite } from '../../store/favorite.model';
@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.css']
})
export class TruckInfoComponent implements OnInit {
  @Input() truck: any 
  image: string
  isFavorite: Boolean
  map: mapboxgl.Map;
  categories: Array<any>
  constructor(private store: Store<any>) { }

  ngOnInit() {
    console.log(this.truck)
    this.image = this.truck.image
    this.isFavorite = this.truck.isFavorite
    this.categories = this.truck.categories
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
favoriteBtn() {
  var newFavorite = new Favorite
  newFavorite.id = this.truck.id
  newFavorite.name = this.truck.name
  newFavorite.price = this.truck.price
  newFavorite.rating = this.truck.rating
  newFavorite.categories = [Object]
  this.truck.categories.map(category => newFavorite.categories.push(category))
  console.log(newFavorite.categories)
  newFavorite.website = this.truck.website
  newFavorite.image = this.truck.image
  newFavorite.lat = this.truck.lat
  newFavorite.long = this.truck.long
  newFavorite.isFavorite = true
  this.addFavorite(newFavorite)
}
unfavorite() {
  var newFavorite = new Favorite
  newFavorite.id = this.truck.id
  newFavorite.name = this.truck.name
  newFavorite.price = this.truck.price
  newFavorite.rating = this.truck.rating
  newFavorite.categories = [Object]
  this.truck.categories.map(category => newFavorite.categories.push(category))
  newFavorite.website = this.truck.website
  newFavorite.image = this.image
  newFavorite.lat = this.truck.lat
  newFavorite.long = this.truck.long
  newFavorite.isFavorite = false
  this.removeFavorite(newFavorite)
}
addFavorite(truck) {
  this.store.dispatch(new FavoriteStore.AddFavorite(truck))
}
removeFavorite(truck) {
  this.store.dispatch(new FavoriteStore.RemoveFavorite(truck))
}

}
