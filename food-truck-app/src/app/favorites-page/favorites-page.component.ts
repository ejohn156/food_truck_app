import { Component, OnInit } from '@angular/core';
import * as FavoriteStore from '../store/action';
import { Store, select } from '@ngrx/store';
import { Favorite } from '../store/favorite.model';
@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit {
  favorites: Array<any>
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.select('favorites').subscribe((state => this.favorites = state))
  }

  removeFavorite(truck) {
    this.store.dispatch(new FavoriteStore.RemoveFavorite(truck))
    window.alert(truck.name + " has been removed from your favorites")
  }
  unfavorite(favorite) {
    this.removeFavorite(favorite)
  }
}
