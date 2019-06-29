import { Directive, ElementRef, Renderer , Input } from '@angular/core';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Directive({
  selector: '[appTextColor]'
})
export class TextColorDirective {
  @Input('appTextColor') text_color: number;

  private _el: ElementRef;
  private _renderer: Renderer;
 
  constructor(el: ElementRef,public renderer: Renderer) {
    this._el = el;
    this._renderer= renderer;
  }

  ngDoCheck() {
    this.setColor(this.text_color)
  }

  private setColor(valor: number) {
    let color ="#f8ac59";
    if(valor < -1){
      color= "#ed5565";
    }
    else if(valor > 0.0000){
      color= "#1ab394";
    }
    this._renderer.setElementStyle(this._el.nativeElement, 'color', color);
  }

}
