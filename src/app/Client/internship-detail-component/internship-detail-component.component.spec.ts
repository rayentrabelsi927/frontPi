import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipDetailComponentComponent } from './internship-detail-component.component';

describe('InternshipDetailComponentComponent', () => {
  let component: InternshipDetailComponentComponent;
  let fixture: ComponentFixture<InternshipDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternshipDetailComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternshipDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
