import { Title } from '@angular/platform-browser';

export class Truck {  
    id: number
    name: string
    price: string
    rating: number
    website: string
    categories: [{
        alias: string
        title: string
    }]
    lat: number
    long: number
    isFavorite = false
    image: string
}