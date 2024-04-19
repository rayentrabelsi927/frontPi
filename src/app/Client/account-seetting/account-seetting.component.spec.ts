import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSeettingComponent } from './account-seetting.component';

describe('AccountSeettingComponent', () => {
  let component: AccountSeettingComponent;
  let fixture: ComponentFixture<AccountSeettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSeettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSeettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
