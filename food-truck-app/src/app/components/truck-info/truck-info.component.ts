import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.css']
})
export class TruckInfoComponent implements OnInit {
  @Input() truck: any 
  constructor() { }

  ngOnInit() {
    console.log(this.truck)
  }

}
