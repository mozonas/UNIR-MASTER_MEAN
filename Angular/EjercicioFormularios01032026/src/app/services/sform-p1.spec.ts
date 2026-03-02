import { TestBed } from '@angular/core/testing';

import { SFormP1 } from './sform-p1';

describe('SFormP1', () => {
  let service: SFormP1;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SFormP1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
