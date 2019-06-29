import { TestBed } from '@angular/core/testing';

import { SubdeptoProvider } from './subdepto.provider';

describe('SubdeptoProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubdeptoProvider = TestBed.get(SubdeptoProvider);
    expect(service).toBeTruthy();
  });
});
