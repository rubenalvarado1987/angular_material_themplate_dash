import { Injectable } from '@angular/core';
import {   Http} from '@angular/http';
import {   BaseProvider } from '../base.provider'
import { IProvider } from '@interfaces/iprovider';
import { DeptoProvider } from '../depto/depto.provider';
import { TiendaProvider } from '../tienda/tienda.provider';


export class DivisionProvider extends  BaseProvider implements IProvider {
  deptoProvider: DeptoProvider;
  tiendaProvider: TiendaProvider;
  constructor(cadenas:number[],http: Http) {
    super("agg_tienda_clase",cadenas,http)
    this.deptoProvider= new DeptoProvider(http,cadenas);
    this.tiendaProvider= new TiendaProvider(cadenas,http);
 
  }
  
  getAggPorcByTipo(field:string,fechaIni: number,fechaFin,codigo?:string){
    return this.getAggByTipo(field,fechaIni,fechaFin,codigo);
  }
  getAggByTipo(field:string,fechaIni: number,fechaFin,codigo?:string){
    return this.getAggByFiedls([
      {
        "descripcion": {
          "terms": {
            "field": field
          }
        } 
      },     
      {
        "identificador": {
          "terms": {
            "field":codigo===undefined ?"division":codigo
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
    ],field,fechaIni,fechaFin);
  };

  getPesoByTipo(fecha_ini: number, fecha_fin: number,sum_vta_tsc:number, size: number,order:string) {
      return this.getUpDownByField(fecha_ini,fecha_fin, "desc_division.keyword",sum_vta_tsc,size,order);
      }

    getByZonaDivision(fecha_ini: number, fecha_fin: number,zona:string, tienda: number, size: number){
      return this.getAggSumByfields( [
        {
          "title": {
            "terms": {
              "field": "desc_division.keyword"
            }
          }
        }
        ,
        {
          "desc_division": {
            "terms": {
              "field": "desc_division.keyword"
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
      [  { 
          "regexp": {
            "zona_sector.keyword": zona=="Central" && this.cadenas[0]==1 ? "Centro.*":zona+".*"
          }
         },
         {
          "term": { "numctl": tienda }
         }],fecha_ini,fecha_fin,size);   
    }
}
