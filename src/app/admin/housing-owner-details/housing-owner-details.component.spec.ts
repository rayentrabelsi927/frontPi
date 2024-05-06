import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingOwnerDetailsComponent } from './housing-owner-details.component';

describe('HousingOwnerDetailsComponent', () => {
  let component: HousingOwnerDetailsComponent;
  let fixture: ComponentFixture<HousingOwnerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingOwnerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingOwnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
