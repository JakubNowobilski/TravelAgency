import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {AuthService} from './auth.service';
import firebase from 'firebase';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersList: Array<User>;
  authService: AuthService;
  userData: firebase.User = null;
  private httpClient: HttpClient;
  private readonly BASE_URL = 'http://localhost:8080/';
  private readonly USERS_URL = this.BASE_URL + 'users/';

  constructor(httpClient: HttpClient, authService: AuthService) {
    this.httpClient = httpClient;
    this.usersList = new Array<User>();
    this.authService = authService;
    this.authService.getUserData().subscribe((userData) => {
      this.userData = userData;
    });
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.httpClient.get(this.USERS_URL).subscribe((users: Array<any>) => {
        this.usersList = users.map((user) => ({
          ...user
        }));
      }, (errorMsg) => {
        console.log('Error. Error message: ' + errorMsg);
      }
    );
  }

  getUser(email: string): User{
    return this.usersList.find(p => p.email === email);
  }

  getUsersList(): Array<User> {
    return this.usersList;
  }

  addUser(user: User): void{
    this.httpClient.post(this.USERS_URL, {
      email: user.email,
      role: user.role,
    }).subscribe((result: any) => {
      console.log(result);
      const insertedId = result.insertedId;
      if (insertedId !== undefined) {
        user._id = insertedId;
        this.usersList.push(user);
      }
    }, (errorMsg) => {
      console.log('Error. Error message: ' + errorMsg);
    });
  }

  addUserIfNotExists(email: string): void{
    if (this.getUser(email) === undefined) {
      const newUser = new User('', email, 'reader');
      this.addUser(newUser);
    }
  }

  removeUser(user: User): void{
    this.httpClient.delete(this.USERS_URL + user._id).subscribe(result => {
      console.log(result);
    }, (errorMsg) => {
      console.log('Error. Error message: ' + errorMsg);
    });
  }

  getUserRole(): string{
    if (this.userData){
      const user = this.getUser(this.userData.email);
      if (user !== undefined){
        return user.role;
      }
      else {
        return '';
      }
    }
    else {
      return '';
    }
  }
}

