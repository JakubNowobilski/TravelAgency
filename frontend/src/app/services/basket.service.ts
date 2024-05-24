import { Injectable } from '@angular/core';
import {Product} from '../model/product';
import {Trip} from '../model/trip';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {TripsService} from './trips.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  productsList: Array<Product>;
  productsRef: AngularFireList<any>;
  private db: AngularFireDatabase;
  tripsService: TripsService;
  private httpClient: HttpClient;
  private readonly BASE_URL = 'http://localhost:8080/';
  private readonly PRODUCTS_URL = this.BASE_URL + 'products/';
  private readonly ADD_BOOKING_URL = this.PRODUCTS_URL + 'add_booking/';
  private readonly SUBTRACT_BOOKING_URL = this.PRODUCTS_URL + 'subtract_booking/';

  constructor(db: AngularFireDatabase, tripsService: TripsService, httpClient: HttpClient) {
    this.db = db;
    this.tripsService = tripsService;
    this.httpClient = httpClient;
    this.productsRef = this.db.list('products');
    this.productsList = new Array<Product>();
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.httpClient.get(this.PRODUCTS_URL).subscribe((products: Array<any>) => {
        this.productsList = products.map((product) => ({
          _id: product._id,
          key: product._id,
          quantity: product.quantity,
          trip: this.tripsService.getTrip(product.tripId)
        }));
        if (this.productsList.some(e => e.trip === undefined)) {
          console.log('Dupa');
          // this.tripsService.fetchTrips();
          this.productsList.forEach(e => {
            this.productsList = products.map((product) => ({
              _id: product._id,
              key: product._id,
              quantity: product.quantity,
              trip: this.tripsService.getTrip(product.tripId)
            }));
          });
        }
      }, (errorMsg) => {
        console.log('Error. Error message: ' + errorMsg);
      }
    );
  }

  getProductsList(): Array<Product>{
    return this.productsList;
  }

  addPlace(trip: Trip): void {
     const product = this.productsList.find(p => p.trip._id === trip._id);
     if (product !== undefined){
       this.httpClient.get(this.ADD_BOOKING_URL + product._id).subscribe(result => {
         console.log(result);
         product.quantity += 1;
         trip.bookedPlaces += 1;
       }, (errorMsg) => {
         console.log('Error. Error message: ' + errorMsg);
       });
     }
     else{
       this.httpClient.post(this.PRODUCTS_URL, {
         tripId: trip._id,
         quantity: 1
       }).subscribe((result: any) => {
         const newProduct = new Product(result.insertedId, result.insertedId, trip, 1);
         this.productsList.push(newProduct);
         trip.bookedPlaces = 1;
         console.log(result);
       }, (errorMsg) => {
         console.log('Error. Error message: ' + errorMsg);
       });
     }
  }

  dropPlace(trip: Trip): void {
    const product = this.productsList.find(p => p.trip._id === trip._id);
    if (product !== undefined){
      if (product.quantity === 1){
        this.productsRef.remove(product.key);
      }
      else {
        this.productsRef.update(product.key, {quantity: product.quantity - 1});
      }
    }
    else{
      console.error('Attempted to remove non existing product.');
    }
  }

  dropAllPlaces(trip: Trip): void {
    const product = this.productsList.find(p => p.trip._id === trip._id);
    if (product !== undefined){
      this.productsRef.remove(product.key);
    }
    else{
      console.error('Attempted to remove non existing product.');
    }
  }

  getProductQuantity(trip: Trip): number {
    const product = this.productsList.find(p => p.trip._id === trip._id);
    if (product !== undefined){
      return product.quantity;
    }
    else {
      return 0;
    }
  }

  getTotalPrice(): number{
    return this.productsList.reduce<number>((acc, product) =>
      acc += product.trip.price * product.quantity, 0);
  }

  getProductPrice(trip: Trip): number{
    const product = this.productsList.find(p => p.trip._id === trip._id);
    if (product !== undefined){
      return product.quantity * product.trip.price;
    }
    else {
      console.error('Attempted to access non existing product.');
    }
  }
}
