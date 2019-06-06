import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-truck-page',
  templateUrl: './truck-page.component.html',
  styleUrls: ['./truck-page.component.css']
})
export class TruckPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("truck page created")
  }

}
