import {Injectable} from '@angular/core';
import {Trip} from '../model/trip';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {UsersService} from './users.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripsService{
  tripsList: Array<Trip>;
  tripsRef: AngularFireList<any>;
  usersService: UsersService;
  private httpClient: HttpClient;
  private db: AngularFireDatabase;
  private readonly BASE_URL = 'http://localhost:8080/';
  private readonly TRIPS_URL = this.BASE_URL + 'trips';

  constructor(db: AngularFireDatabase, usersService: UsersService, httpClient: HttpClient) {
    this.db = db;
    this.httpClient = httpClient;
    this.tripsRef = this.db.list('trips');
    this.tripsList = new Array<Trip>();
    this.usersService = usersService;
    this.fetchTrips();
  }

  fetchTrips(): void {
    this.httpClient.get(this.TRIPS_URL).subscribe((trips: Array<any>) => {
      this.tripsList = trips.map((trip) => ({
        ...trip,
        key: trip._id,
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

  getTrip(key: string): Trip{
    return this.tripsList.find(p => p.key === key);
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

  addTrip(trip: Trip): void{
    this.verifyDescriptionVolume(trip);
    const {key, ...transferTrip} = trip;
    console.log(transferTrip);
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
    this.tripsRef.remove(trip.key);
  }

  addBooking(trip: Trip): void{
    this.tripsRef.update(trip.key, {bookedPlaces: trip.bookedPlaces + 1});
  }

  dropBooking(trip: Trip): void{
    this.tripsRef.update(trip.key, {bookedPlaces: trip.bookedPlaces - 1});
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
}
