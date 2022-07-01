import { TestBed } from '@angular/core/testing';

import { AmazeSupportService } from './amaze-support.service';

describe('AmazeSupportService', () => {
  let service: AmazeSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmazeSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
