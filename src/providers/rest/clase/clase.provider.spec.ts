import { TestBed } from '@angular/core/testing';

import { ClaseProvider } from './clase.provider';

describe('ClaseProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaseProvider = TestBed.get(ClaseProvider);
    expect(service).toBeTruthy();
  });
});
