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
import {isFilteredReducer} from './store/isFilteredReducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ResultsListComponent } from './components/results-list/results-list.component';
import { FormSFComponent } from './components/form-sf/form-sf.component';
import { MapComponent } from './components/map/map.component'
import {markerReducer} from './store/markerReducer';
import {favMarkerReducer} from './store/favMarkerReducer'
import { TruckInfoComponent } from './components/truck-info/truck-info.component';
import { FooterComponent } from './components/footer/footer.component'


@NgModule({
  declarations: [
    AppComponent,
    MapPageComponent,
    FavoritesPageComponent,
    TruckPageComponent,
    NavbarComponent,
    ResultsListComponent,
    FormSFComponent,
    MapComponent,
    TruckInfoComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      favorites: reducer,
      trucks: truckReducer, 
      filter: filterReducer, 
      filterArray: filterArrayReducer,
      isFiltered: isFilteredReducer,
      marker: markerReducer,
      favMarker: favMarkerReducer
    }),
    BrowserAnimationsModule,
    // StoreModule.forRoot({trucks: truckReducer})
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
