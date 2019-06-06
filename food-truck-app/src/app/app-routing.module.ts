import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapPageComponent } from './map-page/map-page.component'
import {FavoritesPageComponent} from './favorites-page/favorites-page.component'
import {TruckPageComponent} from './truck-page/truck-page.component'

const routes: Routes = [
  { path: 'map', component: MapPageComponent },
  { path: 'truck', component: TruckPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: '',
    redirectTo: '/map',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
