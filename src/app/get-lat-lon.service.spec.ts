import { TestBed } from '@angular/core/testing';

import { GetLatLonService } from './get-lat-lon.service';

describe('GetLatLonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetLatLonService = TestBed.get(GetLatLonService);
    expect(service).toBeTruthy();
  });
});
