import {Trip} from './trip';

export class Product {
  // tslint:disable-next-line:variable-name
  _id: string;
  key: string;
  trip: Trip;
  quantity: number;

  // tslint:disable-next-line:variable-name
  constructor(_id: string, key: string, trip: Trip, quantity: number) {
    this._id = _id;
    this.key = key;
    this.trip = trip;
    this.quantity = quantity;
  }
}
