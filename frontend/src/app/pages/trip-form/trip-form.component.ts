import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Trip} from '../../model/trip';
import {TripsService} from '../../services/trips.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent implements OnInit {
  tripForm: FormGroup;
  formBuilder: FormBuilder;
  tripsService: TripsService;
  private router: Router;

  @Output() addTripEmitter = new EventEmitter<Trip>();

  constructor(formBuilder: FormBuilder, tripsService: TripsService, router: Router) {
    this.formBuilder = formBuilder;
    this.tripsService = tripsService;
    this.router = router;
  }

  ngOnInit(): void {
    this.tripForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      maxPlaces: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      description: ['', Validators.required],
      imgURL: ['', Validators.required],
    });
  }

  postTripData(): void{
    const newTrip = new Trip(
      '',
      this.tripForm.controls.name.value,
      this.tripForm.controls.country.value,
      new Date(this.tripForm.controls.dateStart.value),
      new Date(this.tripForm.controls.dateEnd.value),
      this.tripForm.controls.price.value,
      this.tripForm.controls.maxPlaces.value,
      this.tripForm.controls.description.value,
      this.tripForm.controls.imgURL.value
    );
    this.tripsService.addTrip(newTrip);
    this.tripForm.reset();
    this.router.navigate(['/trips-listing']);
  }
}
