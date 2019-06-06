import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    TruckPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
