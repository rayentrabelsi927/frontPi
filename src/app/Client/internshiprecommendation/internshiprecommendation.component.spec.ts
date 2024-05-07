import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshiprecommendationComponent } from './internshiprecommendation.component';

describe('InternshiprecommendationComponent', () => {
  let component: InternshiprecommendationComponent;
  let fixture: ComponentFixture<InternshiprecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternshiprecommendationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternshiprecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
