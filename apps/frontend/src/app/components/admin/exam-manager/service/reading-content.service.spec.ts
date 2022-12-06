import { TestBed } from '@angular/core/testing';

import { ReadingContentService } from './reading-content.service';

describe('ReadingContentService', () => {
  let service: ReadingContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
