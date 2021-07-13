import { TestBed } from '@angular/core/testing';

import { DataStoryService } from './data-story.service';

describe('DataStoryService', () => {
  let service: DataStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
