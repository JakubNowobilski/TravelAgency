export class User{
  // tslint:disable-next-line:variable-name
  _id: string;
  email: string;
  role: string;

  // tslint:disable-next-line:variable-name
  constructor(_id: string, email: string, role: string) {
    this._id = _id;
    this.email = email;
    this.role = role;
  }
}
