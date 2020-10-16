import { TestBed } from '@angular/core/testing';

import { HOPService } from './hop.service';

describe('HOPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HOPService = TestBed.get(HOPService);
    expect(service).toBeTruthy();
  });
});
