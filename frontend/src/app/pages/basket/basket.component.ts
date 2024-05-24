import { Component, OnInit } from '@angular/core';
import {BasketService} from '../../services/basket.service';
import {TripsService} from '../../services/trips.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketService: BasketService;
  tripsService: TripsService;

  constructor(basketService: BasketService, tripsService: TripsService) {
    this.basketService = basketService;
    this.tripsService = tripsService;
  }

  ngOnInit(): void {
  }

}
