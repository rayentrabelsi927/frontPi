import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingOwnerComponent } from './housing-owner.component';

describe('HousingOwnerComponent', () => {
  let component: HousingOwnerComponent;
  let fixture: ComponentFixture<HousingOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
