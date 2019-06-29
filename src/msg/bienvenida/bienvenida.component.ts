import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {
  public version = environment.version;
  public showBienvenida = true;

  constructor() {
  }

  ngOnInit() {
    var that = this;
    setTimeout(() => {
      that.showBienvenida = false;
    }, 3000);
  }
 

}
