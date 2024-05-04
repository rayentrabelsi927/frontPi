import { TestBed } from '@angular/core/testing';

import { AdminchartsService } from './admincharts.service';

describe('AdminchartsService', () => {
  let service: AdminchartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminchartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
