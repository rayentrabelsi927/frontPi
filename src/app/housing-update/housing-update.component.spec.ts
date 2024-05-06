import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingUpdateComponent } from './housing-update.component';

describe('HousingUpdateComponent', () => {
  let component: HousingUpdateComponent;
  let fixture: ComponentFixture<HousingUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
