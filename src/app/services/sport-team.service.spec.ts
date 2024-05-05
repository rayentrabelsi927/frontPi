import { TestBed } from '@angular/core/testing';

import { SportTeamService } from './sport-team.service';

describe('SportTeamService', () => {
  let service: SportTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
