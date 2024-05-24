import {Injectable} from '@angular/core';
import {Trip} from '../model/trip';
import {UsersService} from './users.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripsService{
  tripsList: Array<Trip>;
  usersService: UsersService;
  private httpClient: HttpClient;
  private readonly BASE_URL = 'http://localhost:8080/';
  private readonly TRIPS_URL = this.BASE_URL + 'trips/';
  private readonly ADD_BOOKING_URL = this.TRIPS_URL + 'add_booking/';
  private readonly SUBTRACT_BOOKING_URL = this.TRIPS_URL + 'subtract_booking/';

  constructor(usersService: UsersService, httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.tripsList = new Array<Trip>();
    this.usersService = usersService;
    this.fetchTrips();
  }

  fetchTrips(): void {
    this.httpClient.get(this.TRIPS_URL).subscribe((trips: Array<any>) => {
      this.tripsList = trips.map((trip) => ({
        ...trip,
        dateStart: new Date(trip.dateStart),
        dateEnd: new Date(trip.dateEnd)
      }));

      this.tripsList.sort((a, b) => {
        return b.price - a.price;
      });
      }, (errorMsg) => {
        console.log('Error. Error message: ' + errorMsg);
      }
    );
  }

  // tslint:disable-next-line:variable-name
  getTrip(_id: string): Trip{
    return this.tripsList.find(p => p._id === _id);
  }

  indexOfTrip(trip: Trip): number{
    return this.tripsList.indexOf(trip);
  }

  getTripAtIndex(idx: number): Trip{
    if (this.tripsList.length < idx){
      return undefined;
    }
    return this.tripsList[idx];
  }

  getTripsList(): Array<Trip> {
    return this.tripsList;
  }

  getNonEmptyTripsList(): Array<Trip> {
    return this.tripsList.filter(t => t.bookedPlaces !== 0);
  }

  addTrip(trip: Trip): void{
    this.verifyDescriptionVolume(trip);
    const {_id, ...transferTrip} = trip;
    this.httpClient.post(this.TRIPS_URL, {
      ...transferTrip,
      dateStart: trip.dateStart.getFullYear() + '-' + trip.dateStart.getMonth() + '-' + trip.dateStart.getDate(),
      dateEnd: trip.dateEnd.getFullYear() + '-' + trip.dateEnd.getMonth() + '-' + trip.dateEnd.getDate()
    }).subscribe(result => {
      console.log(result);
    }, (errorMsg) => {
      console.log('Error. Error message: ' + errorMsg);
    });
  }

  removeTrip(trip: Trip): void{
    this.httpClient.delete(this.TRIPS_URL + trip._id).subscribe(result => {
      console.log(result);
    }, (errorMsg) => {
      console.log('Error. Error message: ' + errorMsg);
    });
  }

  addBooking(trip: Trip): void{
    this.httpClient.get(this.ADD_BOOKING_URL + trip._id).subscribe(result => {
      console.log(result);
      trip.bookedPlaces += 1;
    }, (errorMsg) => {
      console.log('Error. Error message: ' + errorMsg);
    });
  }

  dropBooking(trip: Trip): void{
    this.httpClient.get(this.SUBTRACT_BOOKING_URL + trip._id).subscribe(result => {
      console.log(result);
      trip.bookedPlaces -= 1;
    }, (errorMsg) => {
      console.log('Error. Error message: ' + errorMsg);
    });
  }

  getTotalPlacesBooked(): number{
    return this.tripsList.reduce((acc, trip) => (acc + trip.bookedPlaces), 0);
  }

  verifyDescriptionVolume(trip: Trip): void{
    const descriptionLimit = 360;
    if (trip.description.length > descriptionLimit){
      console.log('Warning! Description of trip: ' + trip.name +
        ' is longer than ' + descriptionLimit + ' characters. May not fit in the space.');
    }
  }

  getTotalPrice(): number{
    return this.tripsList.reduce<number>((acc, trip) => acc += trip.price * trip.bookedPlaces, 0);
  }

  getProductPrice(trip: Trip): number{
    return trip.price * trip.bookedPlaces;
  }

}
