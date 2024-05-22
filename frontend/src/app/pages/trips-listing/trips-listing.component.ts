import { Component, OnInit } from '@angular/core';
import {TripsService} from '../../services/trips.service';

@Component({
  selector: 'app-trips-listing',
  templateUrl: './trips-listing.component.html',
  styleUrls: ['./trips-listing.component.css']
})
export class TripsListingComponent implements OnInit{
  tripsService: TripsService;

  constructor(tripsService: TripsService) {
    this.tripsService = tripsService;
  }

  ngOnInit(): void {
    this.tripsService.fetchTrips();
  }
}
