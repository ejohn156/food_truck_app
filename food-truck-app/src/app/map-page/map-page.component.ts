import { Component, OnInit } from '@angular/core';
import axios from 'Axios'
@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?`, {
      headers: {
        Authorization: `Bearer f-JYAyEnLLbaO2pkyaLg8WQqcq7puzzchmTNmHC-2fVLhWXoMszhCZhRSv-8G50R0zNcB6rfc2kX30bxNRYUQPfg_dh1btpOlI7O-enve-bjnkGje7tWQ10GhS35XHYx`
      },
      params: {
        term: 'food truck',
        location: "Charlotte, NC"
      }
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log('error')
      })

  }
}
