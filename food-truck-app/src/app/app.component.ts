import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  map: mapboxgl.Map;
  static style = 'mapbox://styles/ejohn156/cjx0p7jcw00xw1cnpp75jje08';
}
