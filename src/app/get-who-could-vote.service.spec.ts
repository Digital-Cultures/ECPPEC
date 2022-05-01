import { TestBed } from '@angular/core/testing';

import { GetWhoCouldVoteService } from './get-who-could-vote.service';

describe('GetWhoCouldVoteService', () => {
  let service: GetWhoCouldVoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWhoCouldVoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
