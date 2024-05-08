import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsListOwnerComponent } from './ats-list-owner.component';

describe('AtsListOwnerComponent', () => {
  let component: AtsListOwnerComponent;
  let fixture: ComponentFixture<AtsListOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtsListOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtsListOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
