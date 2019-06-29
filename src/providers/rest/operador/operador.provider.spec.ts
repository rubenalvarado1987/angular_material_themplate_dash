import { TestBed } from '@angular/core/testing';

import { OperadorProvider } from './operador.provider';

describe('OperadorProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperadorProvider = TestBed.get(OperadorProvider);
    expect(service).toBeTruthy();
  });
});
