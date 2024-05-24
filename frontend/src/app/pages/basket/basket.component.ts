import { Component, OnInit } from '@angular/core';
import {TripsService} from '../../services/trips.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  tripsService: TripsService;

  constructor(tripsService: TripsService) {
    this.tripsService = tripsService;
  }

  ngOnInit(): void {
  }

}
