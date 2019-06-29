import { TestBed } from '@angular/core/testing';

import { ZonaProvider } from './zona.provider';

describe('ZonaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZonaProvider = TestBed.get(ZonaProvider);
    expect(service).toBeTruthy();
  });
});
