import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdatesportTeamComponent } from './admin-updatesport-team.component';

describe('AdminUpdatesportTeamComponent', () => {
  let component: AdminUpdatesportTeamComponent;
  let fixture: ComponentFixture<AdminUpdatesportTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdatesportTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUpdatesportTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
