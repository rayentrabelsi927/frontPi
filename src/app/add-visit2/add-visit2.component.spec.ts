import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisit2Component } from './add-visit2.component';

describe('AddVisit2Component', () => {
  let component: AddVisit2Component;
  let fixture: ComponentFixture<AddVisit2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVisit2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVisit2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
