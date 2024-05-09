import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private angularFireAuth: AngularFireAuth;

  constructor(angularFireAuth: AngularFireAuth) {
    this.angularFireAuth = angularFireAuth;
  }

  signIn(email, password): Promise<UserCredential>{
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email, password): ReturnType<firebase.auth.Auth['createUserWithEmailAndPassword']>{
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  signOut(): ReturnType<firebase.auth.Auth['signOut']>{
    return this.angularFireAuth.signOut();
  }

  getUserData(): Observable<firebase.User | null> {
    return this.angularFireAuth.authState;
  }

  setPersistence(mode: string): void {
    if (mode === 'local'){
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {});
    }
    else if (mode === 'session'){
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {});
    }
    else if (mode === 'none'){
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
        .then(() => {});
    }
  }

  // getPersistence(): string{
  //   firebase.auth().;
  // }
}
