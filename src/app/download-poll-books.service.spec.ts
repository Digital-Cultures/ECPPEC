import { TestBed } from '@angular/core/testing';

import { DownloadPollBooksService } from './download-poll-books.service';

describe('DownloadPollBooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadPollBooksService = TestBed.get(DownloadPollBooksService);
    expect(service).toBeTruthy();
  });
});
