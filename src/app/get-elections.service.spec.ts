import { TestBed } from '@angular/core/testing';

import { GetElectionsService } from './get-elections.service';

describe('GetElectionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetElectionsService = TestBed.get(GetElectionsService);
    expect(service).toBeTruthy();
  });
});
