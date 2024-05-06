import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingAtsComponent } from './housing-ats.component';

describe('HousingAtsComponent', () => {
  let component: HousingAtsComponent;
  let fixture: ComponentFixture<HousingAtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingAtsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingAtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
