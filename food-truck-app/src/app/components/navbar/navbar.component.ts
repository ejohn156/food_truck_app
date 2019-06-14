import { Component, OnInit, Input } from '@angular/core';
import bootstrap from 'bootstrap'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() currentPage: String
  constructor() { }

  ngOnInit() {
    console.log(this.currentPage)
  }

}
