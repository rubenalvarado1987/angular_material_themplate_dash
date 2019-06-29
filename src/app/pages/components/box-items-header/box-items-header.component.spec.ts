import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxItemsHeaderComponent } from './box-items-header.component';

describe('BoxItemsHeaderComponent', () => {
  let component: BoxItemsHeaderComponent;
  let fixture: ComponentFixture<BoxItemsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxItemsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxItemsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
