import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {User} from '../model/user';
import {AuthService} from './auth.service';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersList: Array<User>;
  usersRef: AngularFireList<any>;
  authService: AuthService;
  userData: firebase.User = null;
  private db: AngularFireDatabase;

  constructor(db: AngularFireDatabase, authService: AuthService) {
    this.db = db;
    this.usersRef = this.db.list('users');
    this.usersList = new Array<User>();
    this.authService = authService;
    this.authService.getUserData().subscribe((userData) => {
      this.userData = userData;
    });
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.usersRef.snapshotChanges().subscribe(
      (users) => {
        this.usersList = users.map((trip) => ({
          ...trip.payload.val(),
          key: trip.payload.key,
        }));
      },
      (errorMsg) => {
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
    this.usersRef.push({
      ...user,
    });
  }

  removeUser(user: User): void{
    this.usersRef.remove(user.key);
  }

  getUserRole(): string{
    if (this.userData){
      if (this.getUser(this.userData.email)){
        return this.getUser(this.userData.email).role;
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

