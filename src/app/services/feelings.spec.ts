import { TestBed } from '@angular/core/testing';

import { Feelings } from './feelings';

describe('Feelings', () => {
  let service: Feelings;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Feelings);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
