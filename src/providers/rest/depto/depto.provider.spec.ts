import { TestBed } from '@angular/core/testing';

import { DeptoProvider } from './depto.provider';

describe('DeptoProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeptoProvider = TestBed.get(DeptoProvider);
    expect(service).toBeTruthy();
  });
});
