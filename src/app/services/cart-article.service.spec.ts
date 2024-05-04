import { TestBed } from '@angular/core/testing';

import { CartArticleService } from './cart-article.service';

describe('CartArticleService', () => {
  let service: CartArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
