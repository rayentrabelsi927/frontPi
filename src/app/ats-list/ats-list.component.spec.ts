import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsListComponent } from './ats-list.component';

describe('AtsListComponent', () => {
  let component: AtsListComponent;
  let fixture: ComponentFixture<AtsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
