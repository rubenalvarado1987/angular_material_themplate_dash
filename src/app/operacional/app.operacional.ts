import {Component } from '@angular/core';
import { Http } from '@angular/http';
import { ZonaService } from '@services/zona/zona.service';
import { BaseAppComponent } from '../base-app.component';
import { ParentChildService } from '../parent-child.service';
import { ResumenPorcModel } from '@model/resumen-porc.model';
import { DateFilter } from '@model/date-filter.model';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-operacional',
  templateUrl: './app.operacional.html',
  providers: []
})
export class AppOperacional extends BaseAppComponent {
  titleBoxItemsHeader:string="Vista Operacional";

  source: ResumenPorcModel;

  public gridBoxItemsHeader: any = [
    {
    nivel: 0,
    indicePadre: 'TOTAL-RESUMEN-OP',
    padre: 'Detalle Totales',
    indice: 'TOTAL-RESUMEN-OP',
    titulo: 'Detalle Totales'
  }];
  
  public gridviewTienda: any = [
    {
    nivel: 0,
    indicePadre: 'TIENDA-DETALLE-OP',
    padre: 'Detalle Totales x Tienda',
    indice: 'TIENDA-DETALLE-OP',
    titulo: 'Detalle Totales x Tienda'
  }];
  
  
  
  public gridviewDetalle: any = [
    {nivel:0,
    indicePadre: 'ZONA-DEP',
    indice: 'ZONA-DEP',
    },{
    nivel: 0,
    indicePadre: 'ZONA-TIENDA',
    padre: 'Tiendas',
    indice: 'ZONA-TIENDA',
    titulo: 'Tiendas',
    buttons: [{
      indice: 'ZONA-TIENDA-DIV',
      indicePadre: 'ZONA-TIENDA',
      padre:'Tiendas',
      titulo: 'Division',
      agg: 'agg_tienda_div'
    }, {
      indice: 'ZONA-TIENDA-PER',
      indicePadre: 'ZONA-TIENDA',
      padre:'Tiendas',
      titulo: 'Personal',
      agg: 'agg_tienda_op'
    }]
  },{
    nivel:1,
    indice:'ZONA-TIENDA-DIV',
    indicePadre:'ZONA-TIENDA',
    titulo:'Division', 
    buttons: [{
      indice: 'ZONA-TIENDA-DIV-DEP',
      indicePadre: 'ZONA-TIENDA-DIV',
      padre:'Division',
      titulo: 'Depto',
      agg: 'agg_tienda_div_dep'
    },{
      indice: 'ZONA-TIENDA-PER-DIV',
      indicePadre: 'ZONA-TIENDA-DIV',
      padre:'Division',
      titulo: 'Personal',
      agg: 'agg_tienda_op_div'
    }]
  },{
    nivel:1,
    indice:'ZONA-TIENDA-PER',
    indicePadre:'ZONA-TIENDA',
    titulo:'Personal'
  },
  {
    nivel:2,
    indice:'ZONA-TIENDA-PER-DIV',
    indicePadre:'ZONA-TIENDA-DIV',
    titulo:'Personal'
  },
  {
    nivel:2,
    indice:'ZONA-TIENDA-DIV-DEP',
    indicePadre:'ZONA-TIENDA-DIV',
    titulo:'Departamento',
    buttons: [{
      indice: 'ZONA-TIENDA-DIV-DEP-SUBDEP',
      indicePadre: 'ZONA-TIENDA-DIV-DEP',
      padre:'Departamento',
      titulo: 'SubDepto',
      agg: 'agg_tienda_div_dep_subdep'
    },
    {
      indice: 'ZONA-TIENDA-PER-TIENDA-DIV',
      indicePadre: 'ZONA-TIENDA-DIV',
      padre:'Departamento',
      titulo: 'Personal',
      agg: 'agg_tienda_op_div_depart'
    }]
  },
  {
    nivel:3,
    indice:'ZONA-TIENDA-PER-TIENDA-DIV',
    indicePadre:'ZONA-TIENDA-DIV-DEP',
    titulo:'Personal'
  },{
    nivel:3,
    indice:'ZONA-TIENDA-DIV-DEP-SUBDEP',
    indicePadre:'ZONA-TIENDA-DIV-DEP',
    titulo:'Sub Departamento',
    buttons: [{
      indice: 'ZONA-TIENDA-DIV-DEP-SUBDEP-SKU',
      indicePadre: 'ZONA-TIENDA-DIV-DEP-SUBDEP',
      padre:'Sub Depto',
      titulo: 'Sku',
      agg: 'agg_tienda_div_dep_subdep_sku'
    },
    {
      indice: 'ZONA-TIENDA-PER-TIENDA-SUBDPTO',
      indicePadre: 'ZONA-TIENDA-DIV',
      padre:'Sub Depto',
      titulo: 'Personal',
      agg: 'agg_tienda_op_div_depart_subdepart'
    }]
  },
  {
    nivel:4,
    indice:'ZONA-TIENDA-PER-TIENDA-SUBDPTO',
    indicePadre:'ZONA-TIENDA-DIV-DEP-SUBDEP',
    titulo:'Personal'
  },
  {
    nivel:4,
    indice:'ZONA-TIENDA-DIV-DEP-SUBDEP-SKU',
    indicePadre:'ZONA-TIENDA-DIV-DEP-SUBDEP',
    titulo:'Sku'
  }];

  constructor(http: Http,route : ActivatedRoute, parentchildservice:   ParentChildService) {
    super(route,parentchildservice,new ZonaService(http));
    this.source= new ResumenPorcModel();
  } 

  protected execute(date_filter: DateFilter): void {
  
      this.viewTienda.date_filter = date_filter;    
      this.viewTienda.Init( this.tipoSvc.Cadenas);
 
};
}
