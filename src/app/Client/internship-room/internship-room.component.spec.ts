import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipRoomComponent } from './internship-room.component';

describe('InternshipRoomComponent', () => {
  let component: InternshipRoomComponent;
  let fixture: ComponentFixture<InternshipRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternshipRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternshipRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
