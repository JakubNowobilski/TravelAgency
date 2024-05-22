import {Injectable} from '@angular/core';
import {Trip} from '../model/trip';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {UsersService} from './users.service';

@Injectable({
  providedIn: 'root'
})
export class TripsService{
  tripsList: Array<Trip>;
  tripsRef: AngularFireList<any>;
  usersService: UsersService;
  private db: AngularFireDatabase;

  constructor(db: AngularFireDatabase, usersService: UsersService) {
    this.db = db;
    this.tripsRef = this.db.list('trips');
    this.tripsList = new Array<Trip>();
    this.usersService = usersService;
    this.fetchTrips();
  }

  fetchTrips(): void {
    this.tripsRef.snapshotChanges().subscribe(
      (trips) => {
        this.tripsList = trips.map((trip) => ({
          ...trip.payload.val(),
          key: trip.payload.key,
          dateStart: new Date(trip.payload.val().dateStart),
          dateEnd: new Date(trip.payload.val().dateEnd)
        }));
        // if (this.usersService.getUserRole() === 'reader' || this.usersService.getUserRole() === ''){
        //   this.tripsList = this.tripsList.filter(p => p.bookedPlaces !== p.maxPlaces);
        // }
        this.tripsList.sort((a, b) => {
          return b.price - a.price;
        });
      },
      (errorMsg) => {
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
    this.tripsRef.push({
      ...trip,
      dateStart: trip.dateStart.getFullYear() + '-' + trip.dateStart.getMonth() + '-' + trip.dateStart.getDate(),
      dateEnd: trip.dateEnd.getFullYear() + '-' + trip.dateEnd.getMonth() + '-' + trip.dateEnd.getDate()
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
