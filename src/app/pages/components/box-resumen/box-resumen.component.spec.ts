import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxResumenComponent } from './box-resumen.component';

describe('BoxResumenComponent', () => {
  let component: BoxResumenComponent;
  let fixture: ComponentFixture<BoxResumenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxResumenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
