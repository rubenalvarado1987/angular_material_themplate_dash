import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {  AppCadenaTxD } from './app.cadena-txd';

describe('AppComercial', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppCadenaTxD
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppCadenaTxD);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'sales-rf-display'`, () => {
    const fixture = TestBed.createComponent(AppCadenaTxD);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('sales-rf-display');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppCadenaTxD);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to sales-rf-display!');
  });
});
