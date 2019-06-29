import { Injectable } from '@angular/core';
import { BaseProvider } from '../base.provider';
import { IProvider } from '@interfaces/iprovider';
import { Http } from '@angular/http';
import { TiendaProvider } from '../tienda/tienda.provider';
import { DeptoProvider } from '../depto/depto.provider';


export class ZonaProvider extends BaseProvider implements IProvider {
  tiendaProvider: TiendaProvider;
  deptoProvider: DeptoProvider;
  constructor(cadenas: number[], http: Http) {
    super("agg_tienda_clase", cadenas, http)
    this.deptoProvider = new DeptoProvider(http, cadenas);
    this.tiendaProvider = new TiendaProvider(cadenas, http);
  }


  getAggByTipo(field: string, fechaIni: number, fechaFin, codigo?: string) {
    return this.getAggByFiedls([
      {
        "descripcion": {
          "terms": {
            "field": field
          }
        }
      },
      {
        "title": {
          "terms": {
            "field": field
          }
        }
      }
    ], field, fechaIni, fechaFin);
  };


  getAggPorcByTipo(field: string, fechaIni: number, fechaFin, codigo?: string) {
 
    return new Promise(resolve => {
      let arrZona: any;
      let arrSector: any;
      this.getAggByTipo(field, fechaIni, fechaFin).then(rs => {
        arrZona = rs;
         this.getAggSumByfields([
          {
            "descripcion": {
              "terms": {
                "field": "zona_sector.keyword"
              }
            }
          },
          {
            "title": {
              "terms": {
                "field": "zona_sector.keyword"
              }
            }
          }
        ],
          [{
            "regexp": {
              "zona_sector.keyword": "Centro.*"
            }
          }
          ]
          , fechaIni, fechaFin, 10000).then(rs => {
            arrSector = rs;
        
            arrSector.forEach(el => {
              arrZona.push(el);
            });
            resolve(arrZona);

          });
      })

    });



  };



  getPesoByTipo(fecha_ini: number, fecha_fin: number, sum_vta_tsc: number, size: number, order: string) {
    return this.getUpDownByField(fecha_ini, fecha_fin, "zona.keyword", sum_vta_tsc, size, order);
  }

}
