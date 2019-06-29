import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ClaseProvider } from '@providers/rest/clase/clase.provider';
import { Http } from '@angular/http';
import { DateFilter } from '@model/date-filter.model';
import { Item } from '@mapper/item';


export class ClaseService extends BaseService {
  claseProvider:  ClaseProvider
  constructor(http:Http,cadenas:number[]=[],tiendas:number[]=[]) { 
   super();
   this.claseProvider= new ClaseProvider(cadenas,http);
   this.claseProvider.tiendas=tiendas;
  }

  getClaseBySubdepart(date_filter: DateFilter, subdpto: number, depart:number,  division: number) {
    return new Promise(resolve => {
      this.claseProvider.getClaseBySubdepart(date_filter.fecha_ini_start,date_filter.fecha_ini_end,subdpto,depart, division, 500).then((rs) => {
        let source_ini = Item.Map(rs);
    
        this.claseProvider.getClaseBySubdepart(date_filter.fecha_fin_start,date_filter.fecha_fin_end,subdpto,depart, division,500).then((rs) => {
            
              let source_aa =   Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
   }
}
