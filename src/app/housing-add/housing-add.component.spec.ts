import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingAddComponent } from './housing-add.component';

describe('HousingAddComponent', () => {
  let component: HousingAddComponent;
  let fixture: ComponentFixture<HousingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
