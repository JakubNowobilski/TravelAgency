import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../model/trip';
import {TripsService} from '../../services/trips.service';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit{
  @Input() trip: Trip;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;
  tripIdx: number;

  tripsService: TripsService;
  usersService: UsersService;

  ngOnInit(): void {
    this.tripIdx = this.tripsService.indexOfTrip(this.trip);
  }

  constructor(tripsService: TripsService, usersService: UsersService) {
    this.tripsService = tripsService;
    this.usersService = usersService;
  }

  bookPlaceClicked(): void{
    this.tripsService.addBooking(this.trip);
  }

  dropPlaceClicked(): void{
    this.tripsService.dropBooking(this.trip);
  }
}
