import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceAdminComponent } from './freelance-admin.component';

describe('FreelanceAdminComponent', () => {
  let component: FreelanceAdminComponent;
  let fixture: ComponentFixture<FreelanceAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelanceAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelanceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
