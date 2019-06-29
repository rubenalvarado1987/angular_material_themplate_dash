import { Injectable } from '@angular/core';
import { DateFilter } from '@model/date-filter.model';
import { DeptoProvider } from '@providers/rest/depto/depto.provider';
import { BaseService } from '../base.service';
import { Http } from '@angular/http';
import { Item } from '@mapper/item';

 
export class DeptoService extends BaseService {
  deptoProvider: DeptoProvider;
 
  constructor(http: Http,cadenas:number[],tiendas:number[]=[]) {
    super();
     this.deptoProvider= new  DeptoProvider(http,cadenas);
     this.deptoProvider.tiendas=tiendas;
   }
  
  getDepartByDivision(date_filter: DateFilter,division):any{

    return new Promise(resolve => {
      this.deptoProvider.getDepartByDivision(date_filter.fecha_ini_start,date_filter.fecha_ini_end,division,500).then((rs) => {
       
        let source_ini = Item.Map(rs);
            this.deptoProvider.getDepartByDivision(date_filter.fecha_fin_start,date_filter.fecha_fin_end,division,500).then((rs) => {
            
              let source_aa = Item.Map(rs);
             
              let source=this.mergeSource(source_ini.deptos, function(value){
            
                return source_aa.deptos.find(sa=>sa.desc_division == value.desc_division && sa.desc_depart == value.desc_depart);
              });
           
 
              resolve(source);
            })
        })
    });

   
  }

   
  getByTiendaDivision(date_filter:DateFilter,tienda:number, division: string,){
    return new Promise(resolve => {
      this.deptoProvider.getByTiendaDivision(date_filter.fecha_ini_start,date_filter.fecha_ini_end,tienda,division,500).then((rs) => {
       let source_ini = Item.Map(rs);
 

       this.deptoProvider.getByTiendaDivision(date_filter.fecha_fin_start,date_filter.fecha_fin_end,tienda,division,500).then((rs) => {
           
             let source_aa = Item.Map(rs);
            
             let source=this.mergeSource(source_ini.deptos, function(value){
               return source_aa.deptos.find( s => s.title == value.title);
             });
             resolve(source);
           })
       })
   }); 

}

getByTiendaDivisionOp(date_filter:DateFilter,tienda:number, division: string,){
  return new Promise(resolve => {
    this.deptoProvider.getByTiendaDivisionOp(date_filter.fecha_ini_start,date_filter.fecha_ini_end,tienda,division,500).then((rs) => {
     let source_ini = Item.Map(rs);


     this.deptoProvider.getByTiendaDivisionOp(date_filter.fecha_fin_start,date_filter.fecha_fin_end,tienda,division,500).then((rs) => {
         
           let source_aa = Item.Map(rs);
          
           let source=this.mergeSource(source_ini.deptos, function(value){
             return source_aa.deptos.find( s => s.title == value.title);
           });
           resolve(source);
         })
     })
 }); 

}
}