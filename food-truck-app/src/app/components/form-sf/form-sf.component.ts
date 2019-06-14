import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-sf',
  templateUrl: './form-sf.component.html',
  styleUrls: ['./form-sf.component.css']
})
export class FormSFComponent implements OnInit {
  @Input() formType: String
  @Input() ratingValues: Array<any>
  @Input() priceValues: Array<any>
  constructor() { }

  ngOnInit() {
  }

}
