import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {
  @Input() trucks: Array<any>
  @Input() filtered: Boolean
  constructor() { }

  ngOnInit() {
    console.log(this.filtered.valueOf)
  }

}
