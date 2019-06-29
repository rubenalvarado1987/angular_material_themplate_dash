import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { DivisionService }   from '@services/division/division.service'; 
import { BaseAppComponent } from '../base-app.component';
import { ActivatedRoute } from '@angular/router';
import { ParentChildService } from '../parent-child.service';

@Component({
  selector: 'app-comercial',
  templateUrl: './app.comercial.html',
  // styleUrls: ['./app.comercial.css'],
  providers: []
})
export class AppComercial extends BaseAppComponent {
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
    },{
      analyticsID:'Comercial > Departamento > Tienda',
      indicePadre:'DIV-DEP',
      padre:'Departamentos',
      indice:'DIV-DEP-TIENDA',
      titulo:'Tiendas',
      agg: 'agg_tienda_depto-'
    }]
  },{
    //VISTA PRINCIPAL DE TIENDAS
    nivel:0,
    indicePadre:'DIV-TIENDA',
    padre:'...',
    indice:'DIV-TIENDA',
    titulo:'Tiendas',
    agg: 'agg_tienda_division'
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
    },{
      analyticsID:'Comercial > Departamento > Marca > Tienda',
      indicePadre:'DIV-DEP-MAR',
      padre:'Marca',
      indice:'DIV-DEP-MAR-TIENDA',
      titulo:'Tiendas',
      agg: 'agg_tienda_marca_dpto-'
    }]
  },{
    //VISTA DEPARTAMENTO > MARCA > TIENDA
    nivel:2,
    indice:'DIV-DEP-MAR-TIENDA',
    indicePadre:'DIV-DEP-MAR',
    titulo:'Tiendas'
  },{
    //VISTA DEPARTAMENTO > MARCA > SUB DEPTO
    nivel:2,
    indice:'DIV-DEP-MAR-SUBDEP',
    indicePadre:'DIV-DEP-MAR',
    titulo:'Sub Depto',
    buttons:[{
      indicePadre:'DIV-DEP-MAR-SUBDEP',
      padre:'Sub Depto',
      indice:'DIV-DEP-MAR-SUBDEP-TIENDA',
      titulo:'Tiendas',
      agg: 'agg_tienda_marca_subdpto-'
    },{
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
    titulo:'SKU',
    buttons:[{
      indicePadre:'DIV-DEP-MAR-SUBDEP-SKU',
      padre:'SKU',
      indice:'DIV-DEP-MAR-SUBDEP-SKU-TIENDA',
      titulo:'Tiendas',
      agg: 'agg_sku_subdepto_marca_dpto-'
    }]
  },{
    //VISTA DEPARTAMENTO > MARCA > SUB DEPTO > SKU > TIENDA
    nivel:4,
    indice:'DIV-DEP-MAR-SUBDEP-SKU-TIENDA',
    indicePadre:'DIV-DEP-MAR-SUBDEP-SKU',
    titulo:'Tiendas'
  },{
    //VISTA DEPARTAMENTO > MARCA > SUB DEPTO > TIENDA
    nivel:3,
    indice:'DIV-DEP-MAR-SUBDEP-TIENDA',
    indicePadre:'DIV-DEP-MAR-SUBDEP',
    titulo:'Tiendas'
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
      indice:'DIV-DEP-SUBDEP-TIENDA',
      titulo:'Tiendas',
      agg: 'agg_tienda_subdepartamento-'
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
    },{
      indicePadre:'DIV-DEP-SUBDEP-CLASE',
      padre:'Clase',
      indice:'DIV-DEP-SUBDEP-CLASE-TIENDA',
      titulo:'Tiendas',
      agg: 'agg_tienda_subdepartamento_clase-'
    }]
  },{
    //VISTA DEPARTAMENTO > SUB DEPTO > CLASE > SKU
    nivel:3,
    indice:'DIV-DEP-SUBDEP-CLASE-SKU',
    indicePadre:'DIV-DEP-SUBDEP-CLASE',
    titulo:'SKU',
    buttons:[{
      indicePadre:'DIV-DEP-SUBDEP-CLASE-SKU',
      padre:'SKU',
      indice:'DIV-DEP-SUBDEP-CLASE-SKU-TIENDA',
      titulo:'Tiendas',
      agg: 'agg_tienda_sku_clase_subdepto_dpto-'
    }]
  },{
    //VISTA DEPARTAMENTO > SUB DEPTO > CLASE > SKU > TIENDA
    nivel:4,
    indice:'DIV-DEP-SUBDEP-CLASE-SKU-TIENDA',
    indicePadre:'DIV-DEP-SUBDEP-CLASE-SKU',
    titulo:'Tiendas'
  },{
    //VISTA DEPARTAMENTO > SUB DEPTO > CLASE > TIENDA
    nivel:3,
    indice:'DIV-DEP-SUBDEP-CLASE-TIENDA',
    indicePadre:'DIV-DEP-SUBDEP-CLASE',
    titulo:'Tiendas'
  },{
    //VISTA DEPARTAMENTO > SUB DEPTO > TIENDA
    nivel:2,
    indice:'DIV-DEP-SUBDEP-TIENDA',
    indicePadre:'DIV-DEP-SUBDEP',
    titulo:'Tiendas',
    agg: 'agg_tienda_subdepartamento-'
  },{
    //VISTA DEPARTAMENTO > SUB DEPTO > SKU
    nivel:2,
    indice:'DIV-DEP-SUBDEP-SKU',
    indicePadre:'DIV-DEP-SUBDEP',
    titulo:'SKU',
    buttons:[{
      indicePadre:'DIV-DEP-SUBDEP-SKU',
      padre:'SKU',
      indice:'DIV-DEP-SUBDEP-SKU-TIENDA',
      titulo:'Tiendas',
      agg: 'agg_tienda_sku_subdepto_depto-'
    }]
  },{
    //VISTA DEPARTAMENTO > SUB DEPTO > SKU > TIENDA
    nivel:3,
    indice:'DIV-DEP-SUBDEP-SKU-TIENDA',
    indicePadre:'DIV-DEP-SUBDEP-SKU',
    titulo:'Tiendas'
  },{
    //DEPARTAMENTO > TIENDA
    nivel:1,
    indice:'DIV-DEP-TIENDA',
    titulo:'Tiendas'
  }];

constructor(http: Http, route :     ActivatedRoute,parentchildservice:   ParentChildService) 
{
    super(route,parentchildservice,new  DivisionService(http))
}


}
