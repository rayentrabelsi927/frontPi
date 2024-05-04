import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsmanagementComponent } from './sectionsmanagement.component';

describe('SectionsmanagementComponent', () => {
  let component: SectionsmanagementComponent;
  let fixture: ComponentFixture<SectionsmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionsmanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
