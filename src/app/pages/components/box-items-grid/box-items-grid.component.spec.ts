import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxItemsGridComponent } from './box-items-grid.component';

describe('BoxItemsGridComponent', () => {
  let component: BoxItemsGridComponent;
  let fixture: ComponentFixture<BoxItemsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxItemsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxItemsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
