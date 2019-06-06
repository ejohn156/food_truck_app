import { Component, OnInit, ɵɵNgOnChangesFeature, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';
import axios from 'Axios'
import { Store, select } from '@ngrx/store';
import { Truck } from '../store/truck.model';
import * as TruckStore from "./../store/truckAction"
import { AddFavorite } from '../store/action';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements AfterViewInit, OnInit {

  favorites: Array<any>
  trucks: Array<any>
  constructor(private store: Store<any>) { }
  public truckID: String
  ngOnInit() {
    this.store.select('favorites').subscribe((state => this.favorites = state))
    this.store.select('trucks').subscribe((state => this.trucks = state))
    if(this.trucks.length === 0){
    this.getTruckData()
    }
  }
  ngAfterViewInit(){
    //console.log("after view init")
  }
  getTruckData() {
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?`, {
      headers: {
        Authorization: `Bearer f-JYAyEnLLbaO2pkyaLg8WQqcq7puzzchmTNmHC-2fVLhWXoMszhCZhRSv-8G50R0zNcB6rfc2kX30bxNRYUQPfg_dh1btpOlI7O-enve-bjnkGje7tWQ10GhS35XHYx`
      },
      params: {
        term: 'food truck',
        location: "Charlotte, NC"
      }
    })
      .then((res) => {
        var results = res.data.businesses
        //console.log(results)
        results.map(result => {
          var newTruck = new Truck
          newTruck.id = result.id
          newTruck.name = result.name
          newTruck.price = result.price
          newTruck.rating = result.rating
          newTruck.categories = result.categories
          newTruck.website = result.website
          this.addTruck(newTruck)
        })
      })
      .catch((err) => {
        console.log('error')
      })
  }
  addTruck(truck) {
    this.store.dispatch(new TruckStore.AddTruck(truck))
  }
  removeTrucks(truck) {
    this.store.dispatch(new TruckStore.RemoveTruck(truck))
  }
}
