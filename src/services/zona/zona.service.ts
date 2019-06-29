import { Injectable } from '@angular/core';
import { ZonaProvider } from '@providers/rest/zona/zona.provider';
import { DateFilter } from '@model/date-filter.model';
import { Http } from '@angular/http';
import { ResumenPorcModel } from '@model/resumen-porc.model';
import { DeptoCuotaModel } from '@model/depto-cuota.model';
import { BaseTipoService } from '../basetipo.service';
import { IBaseTipoService } from '@interfaces/ibasetiposervice';
import { DivisionService } from '../division/division.service';
import { OperadorService } from '../operador/operador.service';

@Injectable({
  providedIn: 'root'
})

export class ZonaService extends BaseTipoService implements IBaseTipoService {
  zonaProvider: ZonaProvider;
  divisionSvc: DivisionService;
  operadorSvc: OperadorService;
  constructor(http: Http) {
    super(http);
    this.init();
  }

  protected initChild(){
    this.zonaProvider = new ZonaProvider(this.Cadenas,this.http);
    this.divisionSvc= new DivisionService(this.http);
    this.operadorSvc=  new OperadorService(this.http,this.Cadenas);
  }
  getAggByTipoDate(date_filter: DateFilter) {
    return  new Promise(resolve => {
      this.getAggSumDetalleByField(this.zonaProvider,"zona.keyword", date_filter).then(rs=>{
        resolve(rs); 
       })
     });
  }
  getAggSumByDate(date_filter: DateFilter,title_resumen?:string,name_field="zona.keyword",code_field="zona.keyword") {
   
    return this.getAggSumByfield(this.zonaProvider,title_resumen,name_field,code_field, date_filter);
  }
  
  getAggPorcByDate(date_filter: DateFilter,isUpTienda:boolean,isDownTienda:boolean,isAscOrder:boolean) : ResumenPorcModel{
    return  this.getAggPorcByDateField(this,this.zonaProvider, "zona.keyword", date_filter,isUpTienda,isDownTienda,isAscOrder);
  }
  
  getDataHeaderDetalleInit(date_filter: DateFilter){
    return this.getAggByTipoDate(date_filter);
  }
  getTiendasByTipo(date_filter: DateFilter,tipo:string){
      return  this.tiendaSvc.getByZona(date_filter,tipo);
     }

  getDataByDeptoInit(date_filter: DateFilter,codigo:number){
  
   return  new Promise(resolve => {
    let data: DeptoCuotaModel[] =[]
    resolve(data);
   });
  }

  getDataByTiendaInit(date_filter: DateFilter,tipo:string){
    return this.tiendaSvc.getByZona(date_filter,tipo);
 }

 getDataGrids(agg: string, date_filter: DateFilter, item: DeptoCuotaModel, elemento: any) {
  if (agg == 'agg_tienda_div') {

    this.divisionSvc.getByZonaDivision(date_filter,item.tipo ,item.numctl).then(rs => {
   
          elemento.dataTable = rs; 
    });
  }
  if (agg == 'agg_tienda_div_dep') {
    this.deptoSvc.getByTiendaDivisionOp(date_filter,item.numctl,item.title).then(rs => {
          elemento.dataTable = rs; 
    });
  }
  if (agg == 'agg_tienda_div_dep_subdep') {
    this.subDeptoSvc.getByTiendaDivisionDepto(date_filter,item.numctl,item.desc_division,item.desc_depart).then(rs => {
    
          elemento.dataTable = rs; 
    });
  }
  if (agg == 'agg_tienda_div_dep_subdep_sku') {
    this.productoSvc.getByTiendaDivisionDeptoSubDepto(date_filter,item.numctl,item.desc_division,item.depart,item.subdepto).then(rs => {
   
          elemento.dataTable = rs; 
    });
  }
  if (agg == 'agg_tienda_op') {
  
    this.operadorSvc.getByTienda(date_filter,item.numctl).then(rs => {
          elemento.dataTable = rs; 
    });
  }
  if (agg == 'agg_tienda_op_div') {
 
    this.operadorSvc.getByTiendaDivision(date_filter,item.numctl,item.desc_division).then(rs => {
      elemento.dataTable = rs; 
    });
  
  }
  if(agg == 'agg_tienda_op_div_depart'){
 
    this.operadorSvc.getByTiendaDivisionDepart(date_filter,item.numctl,item.desc_division,item.depart).then(rs => {
      elemento.dataTable = rs; 
    });
  }
  if(agg == 'agg_tienda_op_div_depart_subdepart'){
    this.operadorSvc.getByTiendaDivisionDepartSubdepart(date_filter,item.numctl,item.desc_division,item.depart,item.subdepto).then(rs => {
      elemento.dataTable = rs; 
    });
  }
 }
}
