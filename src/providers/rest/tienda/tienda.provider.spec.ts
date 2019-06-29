import { TestBed } from '@angular/core/testing';
import { TiendaProvider } from './tienda.provider';


describe('TiendaProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiendaProvider = TestBed.get(TiendaProvider);
    expect(service).toBeTruthy();
  });
});
