import {Trip} from './trip';

export class Product {
  key: string;
  trip: Trip;
  quantity: number;

  constructor(key: string, trip: Trip, quantity: number) {
    this.key = key;
    this.trip = trip;
    this.quantity = quantity;
  }
}
