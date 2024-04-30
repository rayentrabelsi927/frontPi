import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTeamClientComponent } from './details-team-client.component';

describe('DetailsTeamClientComponent', () => {
  let component: DetailsTeamClientComponent;
  let fixture: ComponentFixture<DetailsTeamClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTeamClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTeamClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
