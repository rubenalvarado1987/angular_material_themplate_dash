import { Injectable } from '@angular/core';
import { BaseAggModel } from './base-agg.model';

@Injectable({
  providedIn: 'root'
})
export class DeptoModel extends BaseAggModel  {
  vta_interes:number;
  vta_tsc_aa:number;
  vta_retail_aa:number;
  sum_vta_tsc_aa:number;
  sum_vta_retail_aa:number;
  cuota_promedio:number;
  pct_tsc_porc_aa: number;
  pushpartner_sobre_meta: number;
  pushpartner_sobre_meta_aa: number;
  diff_vta_retail: number;
  diff_vta_tsc: number;
  diff_pct: number;
  diff_part:number;
  pct_tsc_aa:number;
  dif_pushpartner: number;
  peso_tsc:number;
  ranking: number;
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
