import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpadateArticleComponent } from './add-upadate-article.component';

describe('AddUpadateArticleComponent', () => {
  let component: AddUpadateArticleComponent;
  let fixture: ComponentFixture<AddUpadateArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpadateArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpadateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
