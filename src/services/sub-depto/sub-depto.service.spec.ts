import { TestBed } from '@angular/core/testing';

import { SubDeptoService } from './sub-depto.service';

describe('SubDeptoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubDeptoService = TestBed.get(SubDeptoService);
    expect(service).toBeTruthy();
  });
});
