import { Injectable } from '@angular/core';
import { SubdeptoProvider } from '@providers/rest/subdepto/subdepto.provider';
import { BaseService } from '../base.service';
import { Http } from '@angular/http';
import { DateFilter } from '@model/date-filter.model';
import { Item } from '@mapper/item';

 
export class SubDeptoService  extends BaseService {
  subdepto:   SubdeptoProvider
  constructor(http:Http,cadenas:number[]=[],tiendas:number[]=[]) {
    super();
    this.subdepto= new SubdeptoProvider(cadenas,http);
    this.subdepto.tiendas=tiendas;
   }

   getSubDepartByTipo(date_filter: DateFilter, division: number, depart:number) {
    return new Promise(resolve => {
      this.subdepto.getSubDepartByTipo(date_filter.fecha_ini_start,date_filter.fecha_ini_end,division,depart,500).then((rs) => {
        let source_ini = Item.Map(rs);
    
        this.subdepto.getSubDepartByTipo(date_filter.fecha_fin_start,date_filter.fecha_fin_end,division,depart,500).then((rs) => {
            
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                
                return source_aa.deptos.find(s => s.desc_subdepto == value.desc_subdepto);
              });
              resolve(source);
            })
        })
    });
   }

   getByTiendaDivisionDepto(date_filter: DateFilter, tienda: number, division: string, depart:string) {
    return new Promise(resolve => {
      this.subdepto.getByTiendaDivisionDepto(date_filter.fecha_ini_start,date_filter.fecha_ini_end,tienda,division,depart,500).then((rs) => {
        let source_ini = Item.Map(rs);
    
        this.subdepto.getByTiendaDivisionDepto(date_filter.fecha_fin_start,date_filter.fecha_fin_end,tienda,division,depart,500).then((rs) => {
            
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                
                return source_aa.deptos.find(s => s.desc_subdepto == value.desc_subdepto);
              });
              resolve(source);
            })
        })
    });
   }
   
}
