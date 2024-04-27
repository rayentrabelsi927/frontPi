import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceDetailComponentComponent } from './freelance-detail-component.component';

describe('FreelanceDetailComponentComponent', () => {
  let component: FreelanceDetailComponentComponent;
  let fixture: ComponentFixture<FreelanceDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelanceDetailComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelanceDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
