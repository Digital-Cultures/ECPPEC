import { TestBed } from '@angular/core/testing';

import { BoroughService } from './borough.service';

describe('BoroughService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoroughService = TestBed.get(BoroughService);
    expect(service).toBeTruthy();
  });
});
