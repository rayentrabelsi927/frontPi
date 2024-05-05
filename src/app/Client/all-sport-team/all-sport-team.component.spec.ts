import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSportTeamComponent } from './all-sport-team.component';

describe('AllSportTeamComponent', () => {
  let component: AllSportTeamComponent;
  let fixture: ComponentFixture<AllSportTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSportTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSportTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
