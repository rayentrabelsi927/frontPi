import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddsportTeamComponent } from './admin-addsport-team.component';

describe('AdminAddsportTeamComponent', () => {
  let component: AdminAddsportTeamComponent;
  let fixture: ComponentFixture<AdminAddsportTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddsportTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddsportTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
