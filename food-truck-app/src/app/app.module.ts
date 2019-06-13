import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";  
import { reducer } from './store/reducer';
import { truckReducer } from './store/truckReducer'
import { filterReducer } from './store/filterReducer'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapPageComponent } from './map-page/map-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { TruckPageComponent } from './truck-page/truck-page.component';
import { FormsModule } from '@angular/forms'
import {filterArrayReducer} from './store/filterArrayReducer'

@NgModule({
  declarations: [
    AppComponent,
    MapPageComponent,
    FavoritesPageComponent,
    TruckPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({favorites: reducer,trucks: truckReducer, filter: filterReducer, filterArray: filterArrayReducer}),
    // StoreModule.forRoot({trucks: truckReducer})
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
