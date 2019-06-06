import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";  
import { reducer } from './store/reducer';
import { truckReducer } from './store/truckReducer'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapPageComponent } from './map-page/map-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { TruckPageComponent } from './truck-page/truck-page.component';

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
    StoreModule.forRoot({favorites: reducer,trucks: truckReducer}),
    // StoreModule.forRoot({trucks: truckReducer})
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
