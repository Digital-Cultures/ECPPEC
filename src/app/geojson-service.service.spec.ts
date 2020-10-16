import { TestBed } from '@angular/core/testing';

import { GeojsonServiceService } from './geojson-service.service';

describe('GeojsonServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeojsonServiceService = TestBed.get(GeojsonServiceService);
    expect(service).toBeTruthy();
  });
});
