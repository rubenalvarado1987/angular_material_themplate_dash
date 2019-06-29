import { Injectable } from '@angular/core';
import { DateFilter } from '../../model/date-filter.model';
import { Http } from '@angular/http';
import { DivisionProvider } from '@providers/rest/division/division.provider';
import { ResumenPorcModel } from '@model/resumen-porc.model';
import { BaseTipoService } from '../basetipo.service';
import { IBaseTipoService } from '@interfaces/ibasetiposervice';
import { DeptoCuotaModel } from '@model/depto-cuota.model';
import { Item } from '@mapper/item';

@Injectable({
  providedIn: 'root'
})

export class DivisionService extends BaseTipoService implements IBaseTipoService {
  private divisionProvider: DivisionProvider;

  public source: any = [];
 
  constructor(http: Http ) {
    super(http);  
  }


  protected initChild(){
    this.divisionProvider = new DivisionProvider(this.Cadenas,this.http);
    this.divisionProvider.tiendas=this.Tiendas;
  }
 
  getDataHeaderDetalleInit(date_filter: DateFilter){
    return this.getAggByTipoDate(date_filter);
  }

  getDataByDeptoInit(date_filter: DateFilter, codigo: number) {
    return this.deptoSvc.getDepartByDivision(date_filter, codigo);
  }
  getDataByTiendaInit(date_filter: DateFilter, tipo: string) {
    return   this.tiendaSvc.getTiendasByDivision(date_filter, tipo);
  }

  getTiendasByTipo(date_filter: DateFilter,tipo:string){
    return  this.tiendaSvc.getTiendasByDivision(date_filter,tipo);
   }

   getAggByTipoDate(date_filter: DateFilter) {
    return  new Promise(resolve => {
      this.getAggSumDetalleByField(this.divisionProvider, "desc_division.keyword", date_filter).then(rs=>{
 
        resolve(rs);
      })
     });
  }

  getAggSumByDate(date_filter: DateFilter,title_resumen?:string,name_field="desc_tipodepto.keyword",code_field="desc_tipodepto.keyword") {
    return  new Promise(resolve => {
      this.getAggSumByfield(this.divisionProvider,title_resumen, name_field,code_field, date_filter).then(rs=>{
        resolve(rs);
      });
    });
  }
  getAggPorcByDate(date_filter: DateFilter,isUpTienda:boolean,isDownTienda:boolean,isAscOrder:boolean): ResumenPorcModel {
    return this.getAggPorcByDateField(this,this.divisionProvider, "desc_division.keyword", date_filter, isUpTienda,isDownTienda,isAscOrder);
  }

  getByZonaDivision(date_filter:DateFilter, zona: string,tienda:number){
 
    this.divisionProvider = new DivisionProvider(this.Cadenas,this.http);
    return new Promise(resolve => {
      this.divisionProvider.getByZonaDivision(date_filter.fecha_ini_start,date_filter.fecha_ini_end,zona,tienda,500).then((rs) => {
       let source_ini = Item.Map(rs);
   
       this.divisionProvider.getByZonaDivision(date_filter.fecha_fin_start,date_filter.fecha_fin_end,zona,tienda,500).then((rs) => {
           
             let source_aa = Item.Map(rs);
            
             let source=this.mergeSource(source_ini.deptos, function(value){
               return source_aa.deptos.find( s => s.desc_division == value.desc_division);
             });
             resolve(source);
           })
       })
   }); 
  }


  getDataGrids(agg: string, date_filter: DateFilter, item: DeptoCuotaModel, elemento: any) {
 
    if (agg == 'agg_subdepto-') {
      this.subDeptoSvc.getSubDepartByTipo(date_filter, item.identificador, item.depart).then(rs => {
        elemento.dataTable = rs;
      });
    }
    if (agg == 'agg_subdepto_clase-') {
      this.claseSvc.getClaseBySubdepart(date_filter, item.subdepto, item.depart, item.identificador).then(rs => {
        elemento.dataTable = rs;
      });
    }
    if (agg == 'agg_tienda_subdepartamento-') {
      let depto = parseInt(item.desc_depart.split(' ')[0]);
      let sub_dpto = parseInt(item.desc_subdepto.split(' ')[0]);
      this.tiendaSvc.getTiendaBySubdepartamento(date_filter, depto, sub_dpto).then(rs => {
        elemento.dataTable = rs;
      });
    }

    if (agg == 'agg_sku-') {
      this.productoSvc.getProductoBySubdepart(date_filter, item.depart, item.subdepto).then((rs) => {
        elemento.dataTable = rs;
      })
    }

    if (agg == 'agg_marca_sku-') {
      let depto = parseInt(item.desc_depart.split(' ')[0]);
      this.productoSvc.getMarcaProductoByDepart(date_filter, depto).then((rs) => {
        elemento.dataTable = rs;
      })
    }

    if (agg == 'agg_tienda_depto-') {
      let depto = parseInt(item.desc_depart.split(' ')[0]);
      this.tiendaSvc.getTiendaByDepto(date_filter, depto).then((rs) => {
        elemento.dataTable = rs;
      })
    }

    if(agg =='agg_tienda_subdepartamento_clase-'){
      let depto = parseInt(item.desc_depart);
      let sub_dpto = parseInt(item.desc_subdepto);
      let clase_ = parseInt(item.desc_clase);
      this.tiendaSvc.getTiendaBySubdepartamentoClase(date_filter, depto, sub_dpto, clase_).then((rs) => {
        elemento.dataTable= rs; 
      })
    }
  
    if(agg == 'agg_sku_dpto_subdepto_clase'){
      let depto = parseInt(item.desc_depart);
      let sub_dpto = parseInt(item.desc_subdepto);
      let clase_ = parseInt(item.desc_clase);
      this.productoSvc.getMarcaBySubdepartamentoClase(date_filter, depto, sub_dpto, clase_).then((rs) => {
        elemento.dataTable= rs; 
      })
    }
    if(agg == 'agg_sku_subdepto'){
      let depto = parseInt(item.desc_depart.split(' ')[0]);
      let marca = item.marca;
      this.productoSvc.getSubdepartamentoByMarca(date_filter, depto, marca).then((rs) => {
        elemento.dataTable= rs; 
      })
    }
    if(agg == 'agg_sku_marca_subdepart-'){
      let depto = parseInt(item.desc_depart.split(' ')[0]);
      let sub_dpto = parseInt(item.desc_subdepto.split(' ')[0]);
      let marca = item.marca;

      this.productoSvc.getProductosBySubdepartMarca(date_filter, depto, sub_dpto, marca).then((rs) => {
        elemento.dataTable= rs; 
      })
    }
    if(agg == 'agg_tienda_marca_dpto-'){
      let depto = parseInt(item.desc_depart.split(' ')[0]);
      let marca = item.marca;
      this.productoSvc.getTiendasByDepartMarca(date_filter, depto, marca).then((rs) => {
        elemento.dataTable= rs; 
      })
    }
    if(agg == 'agg_tienda_sku_clase_subdepto_dpto-'){
      let depto = parseInt(item.desc_depart.split(' ')[0]);
      let sub_dpto = parseInt(item.desc_subdepto.split(' ')[0]);
      let clase_ = parseInt(item.desc_clase.split(' ')[0]);
      let sku = parseInt(item.title);
      this.productoSvc.getTiendasByDptoSubdeptoClaseSku(date_filter, depto, sub_dpto, clase_, sku).then((rs) => {
        elemento.dataTable= rs; 
      })
    }
    if(agg == 'agg_tienda_sku_subdepto_depto-'){
      let depto = parseInt(item.desc_depart.split(' ')[0]);
      let sub_dpto = parseInt(item.desc_subdepto.split(' ')[0]);
      let sku = parseInt(item.title);

      this.productoSvc.getTiendasByDptoSubdeptoSku(date_filter, depto, sub_dpto, sku).then((rs) => {
        elemento.dataTable= rs; 
      })
    }
    if(agg == 'agg_tienda_marca_subdpto-'){
  
 
      let subdepto = parseInt(item.desc_subdepto.split(' ')[0]);
      this.productoSvc.getTiendasByMarcaSubdepto(date_filter, item.marca,subdepto).then((rs) => {
        elemento.dataTable= rs; 
      })
    }
    if(agg == 'agg_sku_subdepto_marca_dpto-'){
     
      let depto = parseInt(item.desc_depart.split(' ')[0]);
      let sub_dpto = parseInt(item.desc_subdepto.split(' ')[0]);
      let sku = parseInt(item.title);
      

      this.productoSvc.getTiendasByDptoSubdeptoSkuMarca(date_filter, depto, sub_dpto, sku, item.marca).then((rs) => {
        elemento.dataTable= rs; 
      })
    }

  }
}