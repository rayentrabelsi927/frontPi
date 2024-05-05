import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllsportTeamComponent } from './admin-allsport-team.component';

describe('AdminAllsportTeamComponent', () => {
  let component: AdminAllsportTeamComponent;
  let fixture: ComponentFixture<AdminAllsportTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllsportTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllsportTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
