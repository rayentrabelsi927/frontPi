import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticFeedbackComponent } from './statistic-feedback.component';

describe('StatisticFeedbackComponent', () => {
  let component: StatisticFeedbackComponent;
  let fixture: ComponentFixture<StatisticFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
