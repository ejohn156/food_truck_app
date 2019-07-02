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
import { isFiltered } from '../store/isFiltered.model'
import * as IsFilteredStore from './../store/isFilteredAction'
import {MapboxService} from '../mapbox.service'
import {Marker} from '../store/marker.model'
import * as MarkerStore from '../store/markerAction'

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css'],
})
export class MapPageComponent implements AfterViewInit, OnInit {

  filterChecker: Array<any>
  isFiltered: Boolean
  priceValues: Array<any>
  ratingValues: Array<any>
  categoryValues: Array<any>
  searchModel = new Search("", "")
  filterState: Array<any>
  filterArrayState: Array<any>
  favorites: Array<any>
  trucks: Array<any>
  markers: Array<any>
  filteredTrucks = []
  searchEntry: String
  searchTypes = ["search", "all"]
  filteredMarkers: Array<any>;
  unfilteredMarkers: Array<any>
  constructor(private store: Store<any>) { }
  public truckID: String
  isLoaded = false
  ngOnInit() {
    this.searchModel.type = "name"

    this.store.select('favorites').subscribe((state => this.favorites = state))
    this.store.select('trucks').subscribe((state => this.trucks = state))
    this.store.select('filter').subscribe((state => this.filterState = state))
    this.store.select('filterArray').subscribe((state => this.filterArrayState = state))
    this.store.select('isFiltered').subscribe((state => this.filterChecker = state))
    this.store.select('marker').subscribe((state => this.markers = state))
    this.setFilter()
    this.priceValues = this.filterArrayState[0].price
    this.ratingValues = this.filterArrayState[0].rating
    this.categoryValues = this.filterArrayState[0].categories
    this.isFiltered = this.filterChecker[0].value
    if (this.isFiltered == true) {
      this.getFilteredTrucks()
    }
    console.log(this.filterChecker)
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
      case "search": {
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
        var matchFound = false
        this.categoryValues = []
        this.ratingValues = []
        this.priceValues = []
        var results = res.data.businesses
        results.map(result => {
          if (matchFound == false) {
            var newTruck = new Truck
            newTruck.id = result.id
            newTruck.name = result.name
            newTruck.price = result.price
            newTruck.rating = result.rating
            newTruck.categories = result.categories
            newTruck.website = result.url
            newTruck.lat = result.coordinates.latitude
            newTruck.long = result.coordinates.longitude
            newTruck.image = result.image_url
            this.addTruck(newTruck)
            if (!this.priceValues.includes(newTruck.price) && !isUndefined(newTruck.price)) {
              this.priceValues.push(newTruck.price)
            }
            if (!this.ratingValues.includes(newTruck.rating)) {
              this.ratingValues.push(newTruck.rating)
            }
            newTruck.categories.map(category => {
              if (!this.categoryValues.includes(category.title) && category.alias != "foodtrucks") {
                this.categoryValues.push(category.title)
              }
            })
            if (entry === newTruck.name) {
              matchFound = true
            }
          }
        })
        
        this.ratingValues.sort()
        this.ratingValues.push("All")
        this.priceValues.push("All")
        this.categoryValues.push("All")
        this.ratingValues.reverse()
        this.priceValues.reverse()
        this.categoryValues.reverse()
        this.filterArrayState[0].rating = this.ratingValues
        this.filterArrayState[0].price = this.priceValues
        this.filterArrayState[0].categories = this.categoryValues
        this.filterState[0].rating = this.ratingValues[0]
        this.filterState[0].price = this.priceValues[0]
        this.filterState[0].category = this.categoryValues[0]
        this.filteredTrucks = []
        console.log(this.categoryValues)
        this.trucks.map(truck => {
          this.filteredTrucks.push(truck)
        })
        const unfilteredMarkers = MapboxService.getMarkers(this.trucks);
        this.filteredMarkers = MapboxService.getMarkers(this.filteredTrucks)
        this.filteredMarkers.map(marker => this.addMarker(marker))
        this.isLoaded = true
      })
      .catch((err) => {
        console.log(err)
      })
  }
  updateFilterState(filter, filterArray, filterChecker) {
    this.store.dispatch(new FilterStore.AddFilter(filter))
    this.store.dispatch(new FilterArrayStore.AddFilterArray(filterArray))
    this.store.dispatch(new IsFilteredStore.AddIsFiltered(filterChecker))
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
  addMarker(marker) {
    const newMarker = new Marker
    newMarker.geoJSON = marker
    this.store.dispatch(new MarkerStore.AddMarker(newMarker))
  }
  removeMarker(marker) {
    this.store.dispatch(new MarkerStore.RemoveMarker(marker))
  }
  clearMarkers() {
    this.markers.map(marker => this.removeMarker(marker))
  }
  clearTrucks() {
    this.trucks.map(truck => this.removeTrucks(truck))
  }
  filter(type, term) {
    console.log("filter type: " + type + "\nfilter term: " + term)
  }
  onSubmit(f: NgForm) {
    this.clearTrucks()
    this.clearMarkers()
    this.getTruckData("search", this.searchModel.entry)
  }
  resetSearch() {
    this.clearTrucks()
    this.clearMarkers()
    this.getTruckData("all", this.searchModel.entry)
  }
  onChangeType(type: any) {
    this.searchModel.type = type
  }
  onChangeRatingFilter(rating: any) {
    if (rating != "All") {
      rating = Number(rating)
    }
    this.filterState[0].rating = rating
  }
  onChangeCategoryFilter(category: any) {
    if (category != "All") {
      category = String(category)
    }
    this.filterState[0].category = category
    console.log(this.filterState[0])
  }
  updateFilter(filter: NgForm) {
    this.clearMarkers()
    this.filterChecker[0].value = true
    this.isFiltered = this.filterChecker[0]

    this.getFilteredTrucks()
  }
  priceFilterChange(price: any) {
    console.log(price)
    this.filterState[0].price = price
  }
  clearFilter() {
    this.filterChecker[0].value = false
    this.isFiltered = this.filterChecker[0]
    this.filteredTrucks = this.trucks
    this.clearMarkers()
    this.filteredMarkers = MapboxService.getMarkers(this.filteredTrucks)
    this.filteredMarkers.map(marker => this.addMarker(marker))
  }
  setFilter() {
    var newFilter = new Filter
    newFilter.price = null
    newFilter.rating = null
    newFilter.category = null
    var newFilterArray = new FilterArray
    newFilterArray.price = []
    newFilterArray.rating = []
    newFilterArray.categories = []
    var filterChecker = new isFiltered
    filterChecker.value = false
    this.updateFilterState(newFilter, newFilterArray, filterChecker)
  }
  getFilteredTrucks() {
    
    this.filteredTrucks = []
    this.trucks.map(truck => {
      if(this.filterState[0].category == "All"){
      if ((truck.price == this.filterState[0].price && truck.rating == this.filterState[0].rating )) 
      { this.filteredTrucks.push(truck) }
      else if (truck.price == this.filterState[0].price && this.filterState[0].rating == "All") {
        this.filteredTrucks.push(truck)
      }
      else if (this.filterState[0].price == "All" && this.filterState[0].rating == truck.rating) {
        this.filteredTrucks.push(truck)
      }
      else if (this.filterState[0].price == "All" && this.filterState[0].rating == "All") {
        this.filteredTrucks.push(truck)
      }
    }
    else{
      console.log(this.filterState[0].category)
      truck.categories.map(category => {
        if(category.title == this.filterState[0].category && truck.price == this.filterState[0].price && truck.rating == this.filterState[0].rating){
          console.log("success")
          this.filteredTrucks.push(truck)
        }
        if(category.title == this.filterState[0].category && this.filterState[0].price == "All" && this.filterState[0].rating == "All"){
          console.log("success")
          this.filteredTrucks.push(truck)
        }
        if(category.title == this.filterState[0].category && this.filterState[0].price == "All" && this.filterState[0].rating == truck.rating){
          console.log("success")
          this.filteredTrucks.push(truck)
        }
        if(category.title == this.filterState[0].category && truck.price == this.filterState[0].price && this.filterState[0].rating == "All"){
          console.log("success")
          this.filteredTrucks.push(truck)
        }
      })
    }
    })
    this.filteredMarkers = MapboxService.getMarkers(this.filteredTrucks);
        this.filteredMarkers.map(marker => this.addMarker(marker))
  }
}
