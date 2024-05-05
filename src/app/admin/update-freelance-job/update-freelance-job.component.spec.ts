import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFreelanceJobComponent } from './update-freelance-job.component';

describe('UpdateFreelanceJobComponent', () => {
  let component: UpdateFreelanceJobComponent;
  let fixture: ComponentFixture<UpdateFreelanceJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFreelanceJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFreelanceJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
