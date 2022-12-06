import { TestBed } from '@angular/core/testing';

import { TestSessionManagerService } from './test-session-manager.service';

describe('TestSessionManagerService', () => {
  let service: TestSessionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestSessionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
