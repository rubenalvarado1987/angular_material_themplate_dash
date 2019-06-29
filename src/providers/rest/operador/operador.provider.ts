import { Injectable } from '@angular/core';
import { BaseProvider } from '../base.provider';
import { Http } from '@angular/http';


export class OperadorProvider extends BaseProvider{

  constructor(cadenas:number[],http:Http) {
    super("agg_operador",cadenas,http);
   }

   getByTienda(fecha_ini: number, fecha_fin: number, tienda: number, size: number){
     return this.getAggSumByfields( [
       {
         "title": {
           "terms": {
             "field": "numope"
           }
         }
       }
       ,
       {
         "numctl": {
           "terms": {
             "field": "numctl"
           }
         }
       }
     ],
     [
        {
         "term": { "numctl": tienda }
        }],fecha_ini,fecha_fin,size);   
   }
   getByTiendaDivision(fecha_ini: number, fecha_fin: number, tienda: number, division:string, size: number){
    return this.getAggSumByfields( [
      {
        "title": {
          "terms": {
            "field": "numope"
          }
        }
      }
      ,
      {
        "numctl": {
          "terms": {
            "field": "numctl"
          }
        }
      }
    ],
    [
       {
        "term": { "numctl": tienda }
       },
       {
        "term": { "desc_division.keyword": division }
       }],fecha_ini,fecha_fin,size);   
  }
  getByTiendaDivisionDepart(fecha_ini: number, fecha_fin: number, tienda: number, division:string, depart:number, size: number){
    return this.getAggSumByfields( [
      {
        "title": {
          "terms": {
            "field": "numope"
          }
        }
      }
      ,
      {
        "numctl": {
          "terms": {
            "field": "numctl"
          }
        }
      }
    ],
    [
       {
        "term": { "numctl": tienda }
       },
       {
        "term": { "desc_division.keyword": division }
       },
       {
        "term": { "depart": depart }
       }],fecha_ini,fecha_fin,size);   
  }
  getByTiendaDivisionDepartSubdepart(fecha_ini: number, fecha_fin: number, tienda: number, division:string, depart:number, subdepart:number, size: number){
    return this.getAggSumByfields( [
      {
        "title": {
          "terms": {
            "field": "numope"
          }
        }
      }
      ,
      {
        "numctl": {
          "terms": {
            "field": "numctl"
          }
        }
      }
    ],
    [
       {
        "term": { "numctl": tienda }
       },
       {
        "term": { "desc_division.keyword": division }
       },
       {
        "term": { "depart": depart }
       },
       {
        "term": { "subdepto": subdepart }
       }],fecha_ini,fecha_fin,size);   
  }
}
