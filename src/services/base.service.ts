import { Injectable } from '@angular/core';
import { IProvider } from '@interfaces/iprovider';
import { DateFilter } from '@model/date-filter.model';
import { ResumenDeptoModel } from '@model/resumen-depto.model';
import { BaseAggModel } from '@model/base-agg.model';
import { DeptoCuotaModel } from '@model/depto-cuota.model';
import { Item } from '@mapper/item';




export abstract class BaseService {

  constructor() {}
  
  getAggSumByfield(T: IProvider, title_resumen: string, name_field: string,codigo, date_filter: DateFilter) {
    return new Promise(resolve => {
      let resumen = new ResumenDeptoModel();
 
      T.getAggByTipo(name_field,date_filter.fecha_ini_start,date_filter.fecha_ini_end,codigo).then((rs) => {
        let agg_depto = Item.Map(rs);
     
        T.getAggByTipo(name_field,date_filter.fecha_fin_start,date_filter.fecha_fin_end,codigo).then((rs) => {

          let agg_depto_aa = Item.Map(rs);
    
          resumen.Deptos = this.mergeSource(agg_depto.deptos, function (value) {
            return agg_depto_aa.deptos.find(s => s.descripcion == value.descripcion );
          });
          resumen.General = new DeptoCuotaModel(new BaseAggModel(title_resumen
            , agg_depto.sum_retail
            , agg_depto.sum_tsc
            , agg_depto.sum_recargo
            , agg_depto.sum_pushpartner_sobre_meta,
            (agg_depto.sum_tsc / agg_depto.sum_retail) * 100
          ))
          
          resumen.General.descripcion=title_resumen;
          resumen.General.title = title_resumen;
          resumen.General.sum_vta_retail_aa = agg_depto_aa.sum_retail;
          resumen.General.sum_vta_tsc_aa = agg_depto_aa.sum_tsc;
          resumen.General.sum_pushpartner_sobre_meta_aa = agg_depto_aa.sum_pushpartner_sobre_meta;
          resumen.General.vta_recargo_aa = agg_depto_aa.sum_recargo;
          resumen.General.vta_interes=agg_depto.sum_interes
          resumen.General.vta_interes_aa=agg_depto_aa.sum_interes
          resumen.General.cuota_avg = agg_depto.sum_cuota_avg;
          resumen.General.cuota_avg_aa = agg_depto_aa.sum_cuota_avg;
          resumen.General.count_trans = agg_depto.sum_trans;
          resumen.General.count_trans_aa = agg_depto_aa.sum_trans;

          resumen.General.pct_tsc_porc = (resumen.General.sum_vta_tsc / resumen.General.sum_vta_retail) * 100;
          resumen.General.pct_tsc_porc_aa = (resumen.General.sum_vta_tsc_aa / resumen.General.sum_vta_retail_aa) * 100;
        
          resumen.General= this.setDiffItem(resumen.General)
          resumen.Deptos.unshift(resumen.General);
 
          resolve(resumen);
        });

      });
    });
  }




  mergeSource(source_ini: any, searchFunction: any): DeptoCuotaModel[] {
    let _source: DeptoCuotaModel[] = [];
 
    source_ini.forEach(s => {

      let source_aa = searchFunction(s);
      if (source_aa == null) {
        source_aa = new DeptoCuotaModel(new BaseAggModel());
      }
      s.sum_vta_retail_aa = source_aa.sum_vta_retail;
      s.sum_vta_tsc_aa = source_aa.sum_vta_tsc;
      s.sum_pushpartner_sobre_meta_aa = source_aa.sum_pushpartner_sobre_meta;
      s.vta_recargo_aa = source_aa.sum_vta_recargo;
      s.cuota_avg_aa = source_aa.cuota_avg;
      s.pct_tsc_porc_aa = source_aa.pct_tsc_porc;
      s.count_aa = source_aa.count;
      s.count_trans_aa = source_aa.count_trans;
      s.vta_interes = s.sum_vta_tsc_0_11 + s.sum_vta_tsc_12_23 + s.sum_vta_tsc_24;
      s.vta_interes_aa = source_aa.sum_vta_tsc_0_11 + source_aa.sum_vta_tsc_12_23 + source_aa.sum_vta_tsc_24
      
     
      _source.push(this.setDiffItem(s));
    });
    return _source;
  }
 
   setDiffItem(item:DeptoCuotaModel):DeptoCuotaModel{
    item.diff_vta_tsc_amt =this.isNull(item.sum_vta_tsc_aa) ?0: item.sum_vta_tsc-  item.sum_vta_tsc_aa;
    item.diff_pct = item.pct_tsc_porc - item.pct_tsc_porc_aa;
    item.diff_vta_retail = this.diff(item.sum_vta_retail, item.sum_vta_retail_aa);
    item.diff_vta_tsc = this.diff(item.sum_vta_tsc, item.sum_vta_tsc_aa);
    item.diff_part = this.diff(item.pct_tsc_porc, item.pct_tsc_porc_aa);
    item.diff_pp = this.diff(item.sum_pushpartner_sobre_meta, item.sum_pushpartner_sobre_meta_aa);
    item.diff_recargo = this.diff(item.sum_vta_recargo, item.vta_recargo_aa);
    item.diff_interes = this.diff(item.vta_interes, item.vta_interes_aa);
    item.diff_cuota_avg = this.diff(item.cuota_avg, item.cuota_avg_aa);
    item.diff_count = this.diff(item.count, item.count_aa)
    item.diff_count_trans = this.diff(item.count_trans, item.count_trans_aa);

    return item;
   }

  public diff(value, value_aa) {
    if (this.isNull(value_aa))
         return 0;

    return ((value - value_aa) / value_aa) * 100
  }

   private isNull(value:number){
   return (isNaN(value) || value === undefined || (typeof value !== 'number'))
   }
}


