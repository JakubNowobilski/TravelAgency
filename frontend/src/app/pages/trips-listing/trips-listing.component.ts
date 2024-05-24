import { Component, OnInit } from '@angular/core';
import {TripsService} from '../../services/trips.service';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-trips-listing',
  templateUrl: './trips-listing.component.html',
  styleUrls: ['./trips-listing.component.css']
})
export class TripsListingComponent implements OnInit{
  tripsService: TripsService;
  usersService: UsersService;

  constructor(tripsService: TripsService, usersService: UsersService) {
    this.tripsService = tripsService;
    this.usersService = usersService;
  }

  ngOnInit(): void {
    this.tripsService.fetchTrips();
    this.usersService.fetchUsers();
  }
}
