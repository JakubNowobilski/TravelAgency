import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TripsService} from '../../services/trips.service';
import {Trip} from '../../model/trip';
import {BasketService} from '../../services/basket.service';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  private route: ActivatedRoute;
  private router: Router;
  tripsService: TripsService;
  basketService: BasketService;
  usersService: UsersService;
  idx: number;

  constructor(route: ActivatedRoute, router: Router, tripsService: TripsService, basketService: BasketService, usersService: UsersService) {
    this.route = route;
    this.router = router;
    this.tripsService = tripsService;
    this.basketService = basketService;
    this.usersService = usersService;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.idx = parseInt(paramMap.get('idx'), 10);
      if (this.tripsService.getTripAtIndex(this.idx) === undefined){
        this.router.navigate(['/page-not-found']);
      }
    });
  }

  getTrip(): Trip {
    return this.tripsService.getTripAtIndex(this.idx);
  }

  bookPlaceClicked(): void{
    this.tripsService.addBooking(this.getTrip());
  }

  dropPlaceClicked(): void{
    this.tripsService.dropBooking(this.getTrip());
  }

  removeTripClicked(): void{
    this.tripsService.removeTrip(this.getTrip());
    // if (this.basketService.getProductQuantity(this.getTrip()) !== 0){
    //   this.basketService.dropAllPlaces(this.getTrip());
    // }
    this.router.navigate(['/trips-listing']);
  }
}
