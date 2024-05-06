import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingAvailabilityComponent } from './housing-availability.component';

describe('HousingAvailabilityComponent', () => {
  let component: HousingAvailabilityComponent;
  let fixture: ComponentFixture<HousingAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingAvailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
