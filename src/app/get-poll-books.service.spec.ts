import { TestBed } from '@angular/core/testing';

import { GetPollBooksService } from './get-poll-books.service';

describe('GetPollBooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetPollBooksService = TestBed.get(GetPollBooksService);
    expect(service).toBeTruthy();
  });
});
