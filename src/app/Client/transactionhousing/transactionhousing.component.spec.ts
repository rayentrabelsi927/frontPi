import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionhousingComponent } from './transactionhousing.component';

describe('TransactionhousingComponent', () => {
  let component: TransactionhousingComponent;
  let fixture: ComponentFixture<TransactionhousingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionhousingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionhousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
