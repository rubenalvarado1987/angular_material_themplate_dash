import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { DivisionService }   from '@services/division/division.service'; 
import { BaseAppComponent } from '../base-app.component';
import { ActivatedRoute } from '@angular/router';
import { ParentChildService } from '../parent-child.service';

@Component({
  selector: 'app-paris-cl',
  templateUrl: './app.paris-cl.html',
  providers: []
})
export class AppParisCL extends BaseAppComponent {
  titleBoxItemsHeader:string="Vista Comercial";

  cargando:boolean = true;
  
  public gridBoxItemsHeader: any = [
    {
    nivel: 0,
    indicePadre: 'TOTAL-RESUMEN-NEG',
    padre: 'Detalle Totales',
    indice: 'TOTAL-RESUMEN-NEG',
    titulo: 'Detalle Totales'
  }];
 
  public gridviewDetalle:any=[{
    //VISTA PRINCIPAL DE DEPARTAMENTO
    nivel:0,
    indicePadre:'DIV-DEP',
    padre:'Departamentos',
    indice:'DIV-DEP',
    titulo:'Departamentos',
    buttons:[{
      analyticsID:'Comercial > Departamento > Sub Depto',
      indicePadre:'DIV-DEP',
      padre:'Departamentos',
      indice:'DIV-DEP-SUBDEP',
      titulo:'Sub Depto',
      agg: 'agg_subdepto-'
    },{
      analyticsID:'Comercial > Departamento > Marca',
      indicePadre:'DIV-DEP',
      padre:'Departamentos',
      indice:'DIV-DEP-MAR',
      titulo:'Marca',
      agg:'agg_marca_sku-'
    }]
  },{
    //VISTA DEPARTAMENTO > MARCA
    nivel:1,
    indice:'DIV-DEP-MAR',
    indicePadre:'DIV-DEP',
    titulo:'Marca',
    buttons:[{
      analyticsID:'Comercial > Departamento > Marca > Sub Depto',
      indicePadre:'DIV-DEP-MAR',
      padre:'Marca',
      indice:'DIV-DEP-MAR-SUBDEP',
      titulo:'Sub Depto',
      agg: 'agg_sku_subdepto'
    }]
  },{
    //VISTA DEPARTAMENTO > MARCA > SUB DEPTO
    nivel:2,
    indice:'DIV-DEP-MAR-SUBDEP',
    indicePadre:'DIV-DEP-MAR',
    titulo:'Sub Depto',
    buttons:[{
      indicePadre:'DIV-DEP-MAR-SUBDEP',
      padre:'Sub Depto',
      indice:'DIV-DEP-MAR-SUBDEP-SKU',
      titulo:'SKU',
      agg: 'agg_sku_marca_subdepart-'
    }]
  },{
    //VISTA DEPARTAMENTO > MARCA > SUB DEPTO > SKU
    nivel:3,
    indice:'DIV-DEP-MAR-SUBDEP-SKU',
    indicePadre:'DIV-DEP-MAR-SUBDEP',
    titulo:'SKU'
  },{
    //VISTA DEPARTAMENTO > SUB DEPTO
    nivel:1,
    indice:'DIV-DEP-SUBDEP',
    indicePadre:'DIV-DEP',
    titulo:'Sub Depto',
    buttons:[{
      indicePadre:'DIV-DEP-SUBDEP',
      padre:'Sub Depto',
      indice:'DIV-DEP-SUBDEP-CLASE',
      titulo:'Clase',
      agg: 'agg_subdepto_clase-'
    },{
      indicePadre:'DIV-DEP-SUBDEP',
      padre:'Sub Depto',
      indice:'DIV-DEP-SUBDEP-SKU',
      titulo:'SKU',
      agg: 'agg_sku-'
    }]
  },{
    //VISTA DEPARTAMENTO > SUB DEPTO > CLASE
    nivel:2,
    indice:'DIV-DEP-SUBDEP-CLASE',
    indicePadre:'DIV-DEP-SUBDEP',
    titulo:'Clase',
    buttons:[{
      indicePadre:'DIV-DEP-SUBDEP-CLASE',
      padre:'Clase',
      indice:'DIV-DEP-SUBDEP-CLASE-SKU',
      titulo:'SKU',
      agg: 'agg_sku_dpto_subdepto_clase'
    }]
  },{
    //VISTA DEPARTAMENTO > SUB DEPTO > CLASE > SKU
    nivel:3,
    indice:'DIV-DEP-SUBDEP-CLASE-SKU',
    indicePadre:'DIV-DEP-SUBDEP-CLASE',
    titulo:'SKU'
  },{
    //VISTA DEPARTAMENTO > SUB DEPTO > SKU
    nivel:2,
    indice:'DIV-DEP-SUBDEP-SKU',
    indicePadre:'DIV-DEP-SUBDEP',
    titulo:'SKU'
  }];

constructor(http: Http, route :     ActivatedRoute,parentchildservice:   ParentChildService) 
{
    super(route,parentchildservice,new  DivisionService(http))
    this.titleResumen="Paris.cl";
}


}
