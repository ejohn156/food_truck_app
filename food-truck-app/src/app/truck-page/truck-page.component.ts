import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from "Axios"
import { Store, select } from '@ngrx/store';
import * as FavoriteStore from '../store/action';

@Component({
  selector: 'app-truck-page',
  templateUrl: './truck-page.component.html',
  styleUrls: ['./truck-page.component.css']
})
export class TruckPageComponent implements OnInit {
  private id: string
  private name: string
  private rating: number
  private categories: Array<any>
  private price: string
  private website: string
  favorites: Array<any>
  trucks: Array<any>
  constructor(private route: ActivatedRoute, private store: Store<any>) {
    this.id = this.route.snapshot.params.id
   }
   
  
  ngOnInit() {
    this.store.select('favorites').subscribe((state => this.favorites = state))
    this.store.select('trucks').subscribe((state => this.trucks = state))
    this.getTruckInfo(this.id)
  }
  getTruckInfo(id){
    this.trucks.map(truck => {
      if(truck.id === this.id){
        console.log(truck)
        this.id = truck.id
        this.name = truck.name
        this.rating = truck.rating
        this.price = truck.price
        this.website = truck.website
        this.categories = truck.categories
      }
    })
  }
  makeFavorite(){
    console.log(this.name + " has been added to your favorites")
  }
}
