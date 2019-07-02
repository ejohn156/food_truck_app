import { Component, OnInit } from '@angular/core';
import * as FavoriteStore from '../store/action';
import { Store, select } from '@ngrx/store';
import { Favorite } from '../store/favorite.model';
import {FavMarker} from '../store/favMarker.model'
import * as FavMarkerStore from '../store/favMarkerAction'
import {MapboxService} from '../mapbox.service'
@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit {
  favorites: Array<any>
  favMarkers: Array<any>
  markers: Array<any>
  constructor(private store: Store<any>) { }

  ngOnInit() {
    
    this.store.select('favorites').subscribe((state => this.favorites = state))

    this.store.select('favMarker').subscribe((state => this.markers = state))
    this.clearMarkers()
    this.favMarkers = MapboxService.getMarkers(this.favorites)
    this.favMarkers.map(marker => 
      this.addMarker(marker))
    
  }
  addMarker(marker) {
    const newMarker = new FavMarker
    newMarker.geoJSON = marker
    this.store.dispatch(new FavMarkerStore.AddFavMarker(newMarker))
  }
  removeMarker(marker) {
    this.store.dispatch(new FavMarkerStore.RemoveFavMarker(marker))
  }
  clearMarkers() {
    this.markers.map(marker => this.removeMarker(marker))
  }
}
