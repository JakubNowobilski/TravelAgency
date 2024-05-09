import { Component, OnInit } from '@angular/core';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketService: BasketService;

  constructor(basketService: BasketService) {
    this.basketService = basketService;
  }

  ngOnInit(): void {
  }

}
