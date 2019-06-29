import { Injectable } from '@angular/core';
import { BaseAggModel } from './base-agg.model';

@Injectable({
  providedIn: 'root'
})
export class DeptoCuotaModel extends BaseAggModel  {
  desc_division: string;
  identificador:number;
  desc_depart: string;
  depart:number;
  subdepto:number;
  desc_subdepto: string;
  tipo : string;
  title : string;
  desc_cadena: string;
  desc_clase: string;
  marca: string;
  numctl:number;
  count:number;
  count_aa:number;
  sum_vta_tsc_aa:number;
  sum_vta_retail_aa:number;
  pct_tsc:number;
  pct_tsc_aa:number;
  sum_pushpartner_sobre_meta_aa:number;
  vta_recargo_aa:number;
  sum_vta_tsc_0_11:number;
  sum_vta_tsc_12_23:number;
  sum_vta_tsc_24: number;
  pct_tsc_porc_aa: number;
  vta_interes:number;
  vta_interes_aa:number;
  count_trans:number;
  count_trans_aa:number;
  cuota_avg:number;
  cuota_avg_aa:number;
  diff_vta_retail: number;
  diff_vta_tsc: number;
  diff_vta_tsc_amt: number;
  diff_pct: number;
  diff_part:number;
  diff_part_aa:number;
  diff_recargo:number;
  diff_pp:number;
  diff_interes:number;
  diff_count:number;
  diff_count_trans:number;
  diff_cuota_avg:number;

  
 


  constructor();
  constructor(aggModel:BaseAggModel);
  constructor (aggModel?:BaseAggModel){
    super(aggModel.descripcion,
      aggModel.sum_vta_retail,
      aggModel.sum_vta_tsc,
      aggModel.sum_vta_recargo,
      aggModel.sum_pushpartner_sobre_meta,
      aggModel.pct_tsc_porc)
}
}
