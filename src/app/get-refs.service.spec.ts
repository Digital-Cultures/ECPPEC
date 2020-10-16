import { TestBed } from '@angular/core/testing';

import { GetRefsService } from './get-refs.service';

describe('GetRefsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetRefsService = TestBed.get(GetRefsService);
    expect(service).toBeTruthy();
  });
});
