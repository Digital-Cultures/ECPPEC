import { TestBed } from '@angular/core/testing';

import { CentroidsService } from './centroids.service';

describe('CentroidsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CentroidsService = TestBed.get(CentroidsService);
    expect(service).toBeTruthy();
  });
});
