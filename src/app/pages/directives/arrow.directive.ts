import { Directive, ElementRef, Renderer, Renderer2, Input, ComponentFactoryResolver } from '@angular/core';
import { all } from 'q';
import { empty } from 'rxjs';

@Directive({
  selector: '[appArrow]'
})
export class ArrowDirective {
  @Input('appArrow') arrow: number;

  private _el: ElementRef;
  private _renderer: Renderer2;

  constructor(el: ElementRef, public renderer: Renderer2) {
    this._el = el;
    this._renderer = renderer;
  }

  ngDoCheck() {

    this.setArrow(this.arrow)
  }

  private setArrow(valor: number) {

    let arrow = "";

    if (valor >= 0.0000) {
      arrow = "fa-arrow-up";
    } else if (valor < 0.0000) {
      arrow = "fa-arrow-down";
    }
  if(arrow!=="")
    if (this._el !== null && this._el !== undefined) {
      if (this._renderer != null && this._renderer !== undefined) {
        this._renderer.removeClass(this._el.nativeElement, "fa-arrow-down");
        this._renderer.removeClass(this._el.nativeElement, "fa-arrow-up");
        this._renderer.addClass(this._el.nativeElement, arrow);
      }
    }
  }

}