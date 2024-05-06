import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingRecComponent } from './housing-rec.component';

describe('HousingRecComponent', () => {
  let component: HousingRecComponent;
  let fixture: ComponentFixture<HousingRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingRecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
