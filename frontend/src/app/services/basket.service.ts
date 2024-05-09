import { Injectable } from '@angular/core';
import {Product} from '../model/product';
import {Trip} from '../model/trip';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {TripsService} from './trips.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  productsList: Array<Product>;
  productsRef: AngularFireList<any>;
  private db: AngularFireDatabase;
  tripsService: TripsService;

  constructor(db: AngularFireDatabase, tripsService: TripsService) {
    this.db = db;
    this.tripsService = tripsService;
    this.productsRef = this.db.list('products');
    this.productsList = new Array<Product>();
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productsRef.snapshotChanges().subscribe(
      (products) => {
        this.productsList = products.map((product) => ({
          quantity: product.payload.val().quantity,
          key: product.payload.key,
          trip: this.tripsService.getTrip(product.payload.val().tripKey)
        }));
      },
      (errorMsg) => {
        console.log('Error. Error message: ' + errorMsg);
      }
    );
  }

  getProductsList(): Array<Product>{
    return this.productsList;
  }

  addPlace(trip: Trip): void {
     const product = this.productsList.find(p => p.trip.key === trip.key);
     if (product !== undefined){
       this.productsRef.update(product.key, {quantity: product.quantity + 1});
     }
     else{
       this.productsRef.push({
         tripKey: trip.key,
         quantity: 1
       });
     }
  }

  dropPlace(trip: Trip): void {
    const product = this.productsList.find(p => p.trip.key === trip.key);
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
    const product = this.productsList.find(p => p.trip.key === trip.key);
    if (product !== undefined){
      this.productsRef.remove(product.key);
    }
    else{
      console.error('Attempted to remove non existing product.');
    }
  }

  getProductQuantity(trip: Trip): number {
    const product = this.productsList.find(p => p.trip.key === trip.key);
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
    const product = this.productsList.find(p => p.trip.key === trip.key);
    if (product !== undefined){
      return product.quantity * product.trip.price;
    }
    else {
      console.error('Attempted to access non existing product.');
    }
  }
}
