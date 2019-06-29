import { TestBed } from '@angular/core/testing';
import { DivisionProvider } from './division.provider';
 

describe('DivisionProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service:  DivisionProvider = TestBed.get(DivisionProvider);
    expect(service).toBeTruthy();
  });
});
