import { TestBed } from '@angular/core/testing';

import { GetVotersService } from './get-voters.service';

describe('GetVotersService', () => {
  let service: GetVotersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetVotersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
