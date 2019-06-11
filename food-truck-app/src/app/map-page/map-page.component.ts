import { Component, OnInit, ɵɵNgOnChangesFeature, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';
import axios from 'Axios'
import { Store, select } from '@ngrx/store';
import { Truck } from '../store/truck.model';
import * as TruckStore from "./../store/truckAction"
import { AddFavorite } from '../store/action';
import {NgForm} from '@angular/forms';
import {Search} from '../search'

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements AfterViewInit, OnInit {

  priceValues =["$", "$$", "$$$", "$$$$"]
  ratingValues =[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]
  searchModel = new Search("","")
  favorites: Array<any>
  trucks: Array<any>
  searchEntry: String
  searchTypes = ["name", "cuisine", "all"]
  constructor(private store: Store<any>) { }
  public truckID: String
  ngOnInit() {
    this.searchModel.type = "name"
    this.store.select('favorites').subscribe((state => this.favorites = state))
    this.store.select('trucks').subscribe((state => this.trucks = state))
    if(this.trucks.length === 0){
    this.getTruckData("all", null)
    }
  }
  ngAfterViewInit(){
    //console.log("after view init")
  }
  
  getTruckData(type, entry) {
    var searchParams
    var queryUrl
    switch (type) {
      case "all" :{
        queryUrl = "https://api.yelp.com/v3/businesses/search?"
        searchParams = {
          term: "food trucks",
          //categories: 'foodtrucks',
          location: "Charlotte, NC",
          limit: 50
        }
        break
      }
      case "name": {
        queryUrl = "https://api.yelp.com/v3/businesses/search"
        console.log("name search has been run")
        console.log(entry)
        searchParams = {
          term: entry,
          categories: "foodtrucks",
          location: "Charlotte, NC",
          limit: 1
        }
        break
      }
      case "cuisine": {
        queryUrl = "https://api.yelp.com/v3/businesses/search?"
        console.log("cuisine search has been run")
        searchParams = {
          term: entry,
          categories: "foodtrucks",
          location: "Charlotte, NC",
          limit: 50
        }
        break
      }

    }
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}` + queryUrl, {
      headers: {
        Authorization: `Bearer f-JYAyEnLLbaO2pkyaLg8WQqcq7puzzchmTNmHC-2fVLhWXoMszhCZhRSv-8G50R0zNcB6rfc2kX30bxNRYUQPfg_dh1btpOlI7O-enve-bjnkGje7tWQ10GhS35XHYx`
      },
      params: searchParams
      
    })
      .then((res) => {
        var results = res.data.businesses
        console.log(results)
        results.map(result => {
          var newTruck = new Truck
          newTruck.id = result.id
          newTruck.name = result.name
          newTruck.price = result.price
          newTruck.rating = result.rating
          newTruck.categories = result.categories
          newTruck.website = result.url
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
  clearTrucks(){
    this.trucks.map(truck => this.removeTrucks(truck))
  }
  filter(type, term){
    console.log("filter type: " + type + "\nfilter term: " + term)
  }
  onSubmit(f: NgForm){
    this.clearTrucks()
    console.log(this.searchModel.entry)
    this.getTruckData(this.searchModel.type, this.searchModel.entry)
  }
  onChangeType(type: any){
    this.searchModel.type = type
  }
}
