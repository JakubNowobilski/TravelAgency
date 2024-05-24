import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TripsListingComponent } from './pages/trips-listing/trips-listing.component';
import { TripComponent } from './components/trip/trip.component';
import { TripFormComponent } from './pages/trip-form/trip-form.component';
import { RatingComponent } from './components/rating/rating.component';
import { BasketComponent } from './pages/basket/basket.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import {TripsService} from './services/trips.service';

import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';

import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';

import {RouterModule, Routes} from '@angular/router';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import {AuthService} from './services/auth.service';
import {UsersService} from './services/users.service';
import {AuthGuard} from './guard/auth.guard';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import {HttpClientModule} from "@angular/common/http";

const appRoutes: Routes = [
  {path: 'trips-listing', component: TripsListingComponent},
  {path: 'trips-listing/:idx', component: TripDetailsComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'trip-form', component: TripFormComponent, canActivate: [AuthGuard]},
  {path: 'basket', component: BasketComponent, canActivate: [AuthGuard]},
  {path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/trips-listing', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TripsListingComponent,
    TripComponent,
    TripFormComponent,
    RatingComponent,
    BasketComponent,
    NavigationComponent,
    PageNotFoundComponent,
    TripDetailsComponent,
    SignInComponent,
    SignUpComponent,
    ConfigurationComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    TripsService,
    AuthService,
    UsersService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
