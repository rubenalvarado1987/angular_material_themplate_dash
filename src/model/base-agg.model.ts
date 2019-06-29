import { Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

  export class BaseAggModel {
    descripcion:string;
    sum_vta_retail:number;
    sum_vta_tsc:number;
    sum_vta_recargo:number;
    sum_pushpartner_sobre_meta:number;
    pct_tsc_porc:number;
    constructor();
    constructor(
      descripcion:string,
      sum_vta_retail:number,
      sum_vta_tsc:number,
      sum_vta_recargo:number,
      sum_pushpartner:number,
      pct_tsc_porc:number
    );
    constructor (
      descripcion?:string,
      sum_vta_retail?:number,
      sum_vta_tsc?:number,
      sum_vta_recargo?:number,
      sum_pushpartner_sobre_meta?:number,
      pct_tsc_porc?:number
      ){
        this.descripcion=descripcion;
        this.sum_vta_retail=sum_vta_retail;
        this.sum_vta_tsc=sum_vta_tsc;
        this.sum_vta_recargo=sum_vta_recargo;
        this.sum_pushpartner_sobre_meta=sum_pushpartner_sobre_meta;
        this.pct_tsc_porc=pct_tsc_porc;
    };
    
  }