import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import {  BaseProvider } from '../base.provider'


export class SubdeptoProvider extends  BaseProvider {

  constructor(cadenas:number[], http: Http) {
    super('agg_tienda_clase',cadenas,http)
  }

  getSubDepartByTipo(fecha_ini: number, fecha_fin: number, division: number, depart:number, size: number) {
    return this.getAggSumByfields([
      {

        "desc_depart": {
          "terms": {
            "field": "desc_depart.keyword"
          }
        }
      },
      {
        "depart": {
          "terms": {
            "field": "depart"
          }
        }
      },
      {
        "desc_division": {
          "terms": {
            "field": "desc_division.keyword"
          }
        }
      },
      {
        "identificador": {
          "terms": {
            "field": "division"
          }
        }
      },
      {
        "desc_subdepto": {
          "terms": {
            "field": "desc_subdepto.keyword"
          }
        }
      },
      {
        "subdepto": {
          "terms": {
            "field": "subdepto"
          }
        }
      },
      {
        "title": {
          "terms": {
            "field": "desc_subdepto.keyword"
          }
        }
      }
    ],
    [{
      "term": { "division": division }
     },
     {
      "term": { "depart": depart }
     }
]
,fecha_ini,fecha_fin,size); 
  }

  getByTiendaDivisionDepto(fecha_ini: number, fecha_fin: number, tienda: number, division: string, depart:string, size: number) {
    return this.getAggSumByfields([
      {
        "desc_tienda": {
          "terms": {
            "field": "desc_tienda.keyword"
          }
        }
      }   ,
      {
        "numctl": {
          "terms": {
            "field": "numctl"
          }
        }
      },
      {
        "desc_division": {
          "terms": {
            "field": "desc_division.keyword",
            "missing_bucket":true
          }
        }
      }, 
      {

        "desc_depart": {
          "terms": {
            "field": "desc_depart.keyword",
            "missing_bucket":true
          }
        }
      },
      {

        "depart": {
          "terms": {
            "field": "depart"
          }
        }
      },
      {
        "desc_subdepto": {
          "terms": {
            "field": "desc_subdepto.keyword",
            "missing_bucket":true
          }
        }
      },
      {
        "subdepto": {
          "terms": {
            "field": "subdepto"
          }
        }
      },    
      {
        "title": {
          "terms": {
            "field": "desc_subdepto.keyword"
          }
        }
      }
    ],
    [,
      {
       "term": { "numctl": tienda }
      },
      {
      "term": { "desc_division.keyword": division }
     },
     {
      "term": { "desc_depart.keyword": depart }
     }
]
,fecha_ini,fecha_fin,size); 
  } 
}
