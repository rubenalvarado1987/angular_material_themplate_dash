import { TestBed } from '@angular/core/testing';

import { ProductoProvider } from './producto.provider';

describe('ProductoProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductoProvider = TestBed.get(ProductoProvider);
    expect(service).toBeTruthy();
  });
});
