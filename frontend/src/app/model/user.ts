import {Product} from './product';

export class User{
  key: string;
  email: string;
  role: string;
  basket: Array<Product>;

  constructor(key: string, email: string, role: string, basket: Array<Product>) {
    this.email = email;
    this.role = role;
    this.key = key;
    this.basket = basket;
  }
}
