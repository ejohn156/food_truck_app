import { Component, OnInit, ɵɵNgOnChangesFeature, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';
import axios from 'Axios'
import { Store, select } from '@ngrx/store';
import { Truck } from '../store/truck.model';
import * as TruckStore from "./../store/truckAction"
import { Filter } from '../store/filter.model';
import * as FilterStore from "./../store/filterAction"
import { AddFavorite } from '../store/action';
import { NgForm } from '@angular/forms';
import { Search } from '../search'
import { isUndefined, isString } from 'util';
import { FilterArray } from '../store/filterArray.model';
import * as FilterArrayStore from "./../store/filterArrayAction"

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements AfterViewInit, OnInit {

  isFiltered = false
  priceValues: Array<any>
  ratingValues: Array<any>
  searchModel = new Search("", "")
  filterState: Array<any>
  filterArrayState: Array<any>
  favorites: Array<any>
  trucks: Array<any>
  filteredTrucks= []
  searchEntry: String
  searchTypes = ["name", "cuisine", "all"]
  constructor(private store: Store<any>) { }
  public truckID: String
  ngOnInit() {
    this.searchModel.type = "name"
    
    this.store.select('favorites').subscribe((state => this.favorites = state))
    this.store.select('trucks').subscribe((state => this.trucks = state))
    this.store.select('filter').subscribe((state => this.filterState = state))
    this.store.select('filterArray').subscribe((state => this.filterArrayState = state))
    this.setFilter()
    this.priceValues = this.filterArrayState[0].price
    this.ratingValues = this.filterArrayState[0].rating
    if (this.trucks.length === 0) {
      this.getTruckData("all", null)
    }
  }
  ngAfterViewInit() {
    //console.log("after view init")
  }

  getTruckData(type, entry) {
    var searchParams
    var queryUrl
    switch (type) {
      case "all": {
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
        this.ratingValues = []
        this.priceValues = []
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
          if (!this.priceValues.includes(newTruck.price) && !isUndefined(newTruck.price)) {
            this.priceValues.push(newTruck.price)
          }
          if (!this.ratingValues.includes(newTruck.rating)) {
            this.ratingValues.push(newTruck.rating)
          }
        })
        this.ratingValues.sort()
        this.ratingValues.push("All")
        this.priceValues.push("All")
        this.ratingValues.reverse()
        this.priceValues.reverse()
        this.filterArrayState[0].rating = this.ratingValues
        this.filterArrayState[0].price = this.priceValues
        this.filterState[0].rating = this.ratingValues[0]
        this.filterState[0].price = this.priceValues[0]
        console.log(this.filterArrayState)
      })
      .catch((err) => {
        console.log('error')
      })
  }
  updateFilterState(filter, filterArray) {
    this.store.dispatch(new FilterStore.AddFilter(filter))
    this.store.dispatch(new FilterArrayStore.AddFilterArray(filterArray))
  }
  clearFilterState() {
    this.filterState.map(filter => this.removeFilterState(filter))

  }
  removeFilterState(filter) {
    this.store.dispatch(new FilterStore.RemoveFilter(filter))
  }
  addTruck(truck) {
    this.store.dispatch(new TruckStore.AddTruck(truck))
  }
  removeTrucks(truck) {
    this.store.dispatch(new TruckStore.RemoveTruck(truck))
  }
  clearTrucks() {
    this.trucks.map(truck => this.removeTrucks(truck))
  }
  filter(type, term) {
    console.log("filter type: " + type + "\nfilter term: " + term)
  }
  onSubmit(f: NgForm) {
    this.clearTrucks()
    console.log(this.searchModel.entry)
    this.getTruckData(this.searchModel.type, this.searchModel.entry)
  }
  onChangeType(type: any) {
    this.searchModel.type = type
    console.log(type)
  }
  onChangeRatingFilter(rating: any){
    if(rating != "All"){
    rating = Number(rating)
    }
    this.filterState[0].rating = rating
  }
  updateFilter(filter: NgForm) {
    this.filteredTrucks = []
    console.log(this.filterState[0])
    this.isFiltered = true
    console.log("update filter: " + this.isFiltered)
    this.trucks.map(truck =>{
      if((truck.price == this.filterState[0].price && truck.rating == this.filterState[0].rating))
      {this.filteredTrucks.push(truck)}
      else if(truck.price == this.filterState[0].price && this.filterState[0].rating == "All"){
        this.filteredTrucks.push(truck)
      }
      else if(this.filterState[0].price == "All" && this.filterState[0].rating == truck.rating){
        this.filteredTrucks.push(truck)
      }
      else if(this.filterState[0].price == "All" && this.filterState[0].rating == "All"){
        this.filteredTrucks.push(truck)
      }
      })
      console.log(this.filteredTrucks.length)
  }
  priceFilterChange(price: any){
    console.log(price)
    this.filterState[0].price = price
  }
  clearFilter() {
    this.isFiltered = false
    console.log("clear filter: " + this.isFiltered)
  }
  setFilter() {
    var newFilter = new Filter
    newFilter.price = null
    newFilter.rating = null
    
    var newFilterArray = new FilterArray
    newFilterArray.price = []
    newFilterArray.rating = []

    this.updateFilterState(newFilter, newFilterArray)
  }
}
