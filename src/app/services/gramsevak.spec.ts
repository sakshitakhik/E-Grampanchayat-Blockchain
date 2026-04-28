import { TestBed } from '@angular/core/testing';

import { Gramsevak } from './gramsevak';

describe('Gramsevak', () => {
  let service: Gramsevak;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gramsevak);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
