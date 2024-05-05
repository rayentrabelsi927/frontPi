import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailssportTeamComponent } from './admin-detailssport-team.component';

describe('AdminDetailssportTeamComponent', () => {
  let component: AdminDetailssportTeamComponent;
  let fixture: ComponentFixture<AdminDetailssportTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailssportTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDetailssportTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
