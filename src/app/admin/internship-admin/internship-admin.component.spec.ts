import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipAdminComponent } from './internship-admin.component';

describe('InternshipAdminComponent', () => {
  let component: InternshipAdminComponent;
  let fixture: ComponentFixture<InternshipAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternshipAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternshipAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
