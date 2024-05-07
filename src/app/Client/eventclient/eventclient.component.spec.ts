import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventclientComponent } from './eventclient.component';

describe('EventclientComponent', () => {
  let component: EventclientComponent;
  let fixture: ComponentFixture<EventclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
