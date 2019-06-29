import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { DivisionService }   from '@services/division/division.service'; 
import { BaseAppComponent } from '../base-app.component';
import { ActivatedRoute } from '@angular/router';
import { ParentChildService } from '../parent-child.service';

@Component({
  selector: 'app-cadena-txd',
  templateUrl: './app.cadena-txd.html',
  providers: []
})
export class AppCadenaTxD extends BaseAppComponent {
  titleBoxItemsHeader:string="Vista Comercial TxD";

  cargando:boolean = true;
  
  public gridBoxItemsHeader: any = [
    {
    nivel: 0,
    indicePadre: 'TOTAL-RESUMEN-NEG',
    padre: 'Detalle Totales',
    indice: 'TOTAL-RESUMEN-NEG',
    titulo: 'Detalle Totales'
  }];
 

constructor(http: Http, route :     ActivatedRoute,parentchildservice:   ParentChildService) 
{
    super(route,parentchildservice,new  DivisionService(http))
    this.titleResumen="TxD";
    this.nameField="desc_cadena.keyword";
    this.codeField="cadena";
}


}
