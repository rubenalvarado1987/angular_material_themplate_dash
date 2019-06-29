import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseProvider } from '../base.provider'


export class TiendaProvider extends BaseProvider {
  
  constructor(cadenas:number[],http: Http) {
    super("agg_tienda_clase",cadenas, http)
  }

  getAll(fecha_ini: number, fecha_fin: number) {
    return this.getAggSumByfields([

      {
        "title": {
          "terms": {
            "field": "desc_tienda.keyword"
          }
        }
      }

    ],
      [], fecha_ini, fecha_fin, 10000);
  }

  getTiendaBySubdepartamento(fecha_ini: number, fecha_fin: number, dpto: number, subdepto: number, size: number) {
    return this.getAggSumByfields([
      {
        "title": {
          "terms": {
            "field": "desc_tienda.keyword"
          }
        }
      }

    ],
      [
        {
          "term": { "depart": dpto }
        },
        {
          "term": { "subdepto": subdepto }
        }], fecha_ini, fecha_fin, size);
  }


  getTiendaByDepto(fecha_ini: number, fecha_fin: number, depto: number, size: number) {
    return this.getAggSumByfields([

      {
        "title": {
          "terms": {
            "field": "desc_tienda.keyword"
          }
        }
      }

    ],
      [{
        "term": { "depart": depto }
      }], fecha_ini, fecha_fin, size);
  }
  getTiendaBySubdepartamentoClase(fecha_ini: number, fecha_fin: number, depto: number, subdepto: number, clase: number, size: number) {
    return this.getAggSumByfields([
      {
        "title": {
          "terms": {
            "field": "desc_tienda.keyword"
          }
        }
      }
    ],
      [{
        "term": { "depart": depto },
      },
      {
        "term": { "subdepto": subdepto },
      },
      {
        "term": { "clase": clase },
      }
      ], fecha_ini, fecha_fin, size);
  }
  getTiendasByDivision(fecha_ini: number, fecha_fin: number, division: string, size: number) {
    return this.getAggSumByfields([
      {
        "title": {
          "terms": {
            "field": "desc_tienda.keyword"
          }
        }
      }
    ],
      [
        {
          "regexp": {
            "desc_division.keyword": ".*" + division +".*"
          }
        }
      ], fecha_ini, fecha_fin, size);
  }



  getByZona(fecha_ini: number, fecha_fin: number, zona: string, size: number) {

    return this.getAggSumByfields([
      {
        "tipo": {
          "terms": {
            "field": "zona_sector.keyword",
            "missing_bucket": true
          }
        }
      },
      {
        "title": {
          "terms": {
            "field": "desc_tienda.keyword"
          }
        }
      },
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
          "regexp": {
            "zona_sector.keyword": zona=="Central" && this.cadenas[0]==1 ? "Centro.*":zona+".*"
          }
        }
      ], fecha_ini, fecha_fin, size);
  }

  getUpDownByTienda(fecha_ini: number, fecha_fin: number, division: string, sum_vta_tsc: number, size: number, order: string) {
    return this.getUpDownByField(fecha_ini, fecha_fin, "desc_tienda.keyword", sum_vta_tsc, size, order);
  }
}
