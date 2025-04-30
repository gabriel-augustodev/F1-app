import { TestBed } from '@angular/core/testing';

import { Formula1Service } from './formula1.service';

describe('Formula1Service', () => {
  let service: Formula1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Formula1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
