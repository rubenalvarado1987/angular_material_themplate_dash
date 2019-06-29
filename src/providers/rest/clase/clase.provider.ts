import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { BaseProvider } from '../base.provider';

 
export class ClaseProvider extends BaseProvider {

  constructor(cadenas:number[],public http: Http) {
    super('agg_tienda_clase',cadenas,http)
  }

  getClaseBySubdepart(fecha_ini: number, fecha_fin: number, subdpto: number, depart:number, division: number, size: number) {
    return  this.getAggSumByfields([
      {

        "desc_depart": {
          "terms": {
            "field": "depart"
          }
        }
      },
      {
        "desc_subdepto": {
          "terms": {
            "field": "subdepto"
          }
        }
      },
      {
        "desc_clase": {
          "terms": {
            "field": "clase"
          }
        }
      },
      {
        "title": {
          "terms": {
            "field": "desc_clase.keyword",
            "missing_bucket":true
          }
        }
      }
    ],
    [
      {
        "term": { "division": division }
       },
      {
      "term": { "subdepto": subdpto }
     },
     {
      "term": { "depart": depart }
     }],fecha_ini,fecha_fin,size); 
  }
}
