import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsListingComponent } from './trips-listing.component';

describe('TripsListComponent', () => {
  let component: TripsListingComponent;
  let fixture: ComponentFixture<TripsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
