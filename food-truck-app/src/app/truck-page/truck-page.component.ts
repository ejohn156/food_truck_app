import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as FavoriteStore from '../store/action';
import { Favorite } from '../store/favorite.model';
import { Truck } from '../store/truck.model'

@Component({
  selector: 'app-truck-page',
  templateUrl: './truck-page.component.html',
  styleUrls: ['./truck-page.component.css']
})
export class TruckPageComponent implements OnInit, OnChanges {

  private id: string
  private name: string
  private rating: number
  private categories: Array<any>
  private price: string
  private website: string
  private isFavorite: Boolean
  image: string
  favorites: Array<any>
  trucks: Array<any>
  truck: Truck
  constructor(private route: ActivatedRoute, private store: Store<any>) {
    this.id = this.route.snapshot.params.id
  }

  ngOnChanges(isFavorite: SimpleChanges) {
    this.checkFavoriteStatus()
  }
  ngOnInit() {
    this.store.select('favorites').subscribe((state => this.favorites = state))
    this.store.select('trucks').subscribe((state => this.trucks = state))
    this.getTruckInfo(this.id)
    this.getFavInfo(this.id)
    this.checkFavoriteStatus()

  }

  getTruckInfo(id) {
    this.trucks.map(truck => {
      if (truck.id === this.id) {
        console.log(truck)
        this.id = truck.id
        this.name = truck.name
        this.rating = truck.rating
        this.price = truck.price
        this.website = truck.website
        this.categories = truck.categories
        this.isFavorite = truck.isFavorite
        this.image = truck.image
        this.createTruckObject(truck)
      }
    })
    console.log(this.image)
  }
  getFavInfo(id) {
    this.favorites.map(favorite => {
      if (favorite.id === this.id) {
        console.log(favorite)
        this.id = favorite.id
        this.name = favorite.name
        this.rating = favorite.rating
        this.price = favorite.price
        this.website = favorite.website
        this.categories = favorite.categories
        this.isFavorite = favorite.isFavorite
        this.image = favorite.image
        this.createTruckObject(favorite)
      }
    })
  }
  favoriteBtn() {
    var newFavorite = new Favorite
    newFavorite.id = this.id
    newFavorite.name = this.name
    newFavorite.price = this.price
    newFavorite.rating = this.rating
    newFavorite.categories = [Object]
    this.categories.map(category => newFavorite.categories.push(category))
    newFavorite.website = this.website
    newFavorite.image = this.image
    this.addFavorite(newFavorite)
  }
  unfavorite() {
    var newFavorite = new Favorite
    newFavorite.id = this.id
    newFavorite.name = this.name
    newFavorite.price = this.price
    newFavorite.rating = this.rating
    newFavorite.categories = [Object]
    this.categories.map(category => newFavorite.categories.push(category))
    newFavorite.website = this.website
    newFavorite.image = this.image
    this.removeFavorite(newFavorite)
  }
  checkFavoriteStatus() {
    console.log(this.favorites.length)
    this.favorites.map(favorite => {
      if (favorite.id === this.id) {
        this.isFavorite = true

      }
    })
  }
  addFavorite(truck) {
    this.store.dispatch(new FavoriteStore.AddFavorite(truck))
    window.alert(truck.name + " has been added to your favorites")
  }
  removeFavorite(truck) {
    this.store.dispatch(new FavoriteStore.RemoveFavorite(truck))
    window.alert(truck.name + " has been removed from your favorites")
  }
  createTruckObject(truck) {
    this.truck = new Truck
    this.truck.id = truck.id
    this.truck.name = truck.name
    this.truck.rating = truck.rating
    this.truck.price = truck.price
    this.truck.website = truck.website
    this.truck.categories = truck.categories
    this.truck.isFavorite = truck.isFavorite
    this.truck.image = truck.image
    this.truck.lat = truck.lat
    this.truck.long = truck.long
  }
}
