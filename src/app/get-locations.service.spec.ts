import { TestBed } from '@angular/core/testing';

import { GetLocationsService } from './get-locations.service';

describe('GetLocationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetLocationsService = TestBed.get(GetLocationsService);
    expect(service).toBeTruthy();
  });
});
