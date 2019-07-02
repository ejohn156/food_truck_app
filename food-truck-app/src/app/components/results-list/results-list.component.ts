import { Component, OnInit, Input } from '@angular/core';
import * as FavoriteStore from '../../store/action';
import { Store, select } from '@ngrx/store';
import { Favorite } from '../../store/favorite.model';
import {FavMarker} from '../../store/favMarker.model'
import * as FavMarkerStore from '../../store/favMarkerAction'
import {MapboxService} from '../../mapbox.service'
@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {
  @Input() trucks: Array<any>
  @Input() search: boolean
  @Input() markers: Array<any>
  favorites: Array<any>
  favMarkers: Array<any>
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.select('favorites').subscribe((state => this.favorites = state))
    this.store.select('favMarker').subscribe((state => this.favMarkers = state))
  }

  removeFavorite(truck) {
    this.store.dispatch(new FavoriteStore.RemoveFavorite(truck))
  }
  unfavorite(favorite) {
    this.removeFavorite(favorite)
    this.clearMarkers()
    this.favMarkers = MapboxService.getMarkers(this.favorites)
    this.favMarkers.map(marker => 
      this.addMarker(marker))
    
  }
  removeMarker(marker) {
    this.store.dispatch(new FavMarkerStore.RemoveFavMarker(marker))
  }
  clearMarkers() {
    this.markers.map(marker => this.removeMarker(marker))
  }
  addMarker(marker) {
    const newMarker = new FavMarker
    newMarker.geoJSON = marker
    this.store.dispatch(new FavMarkerStore.AddFavMarker(newMarker))
  }
}
