import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { OperadorProvider } from '@providers/rest/operador/operador.provider';
import { DateFilter } from '@model/date-filter.model';
import { Http } from '@angular/http';
import { Item } from '@mapper/item';
 

export class OperadorService extends BaseService {
  operadorProvider: OperadorProvider
  constructor(http:Http,cadenas:number[]=[],tiendas:number[]=[]) { 
    super();
    this.operadorProvider= new OperadorProvider(cadenas,http);
    this.operadorProvider.tiendas=tiendas;
  }

  getByTienda(date_filter: DateFilter,tienda:number){
    return new Promise(resolve => {
      this.operadorProvider.getByTienda(date_filter.fecha_ini_start,date_filter.fecha_ini_end,tienda,500).then((rs) => {
       let source_ini = Item.Map(rs);
   
       this.operadorProvider.getByTienda(date_filter.fecha_fin_start,date_filter.fecha_fin_end,tienda,500).then((rs) => {
           
             let source_aa = Item.Map(rs);
            
             let source=this.mergeSource(source_ini.deptos, function(value){
               return source_aa.deptos.find( s => s.title == value.title);
             });
             resolve(source);
           })
       })
   }); 
  }
  getByTiendaDivision(date_filter: DateFilter,tienda:number,division:string){
    return new Promise(resolve => {
      this.operadorProvider.getByTiendaDivision(date_filter.fecha_ini_start,date_filter.fecha_ini_end,tienda,division,500).then((rs) => {
       let source_ini = Item.Map(rs);
   
       this.operadorProvider.getByTiendaDivision(date_filter.fecha_fin_start,date_filter.fecha_fin_end,tienda,division,500).then((rs) => {
           
             let source_aa = Item.Map(rs);
            
             let source=this.mergeSource(source_ini.deptos, function(value){
               return source_aa.deptos.find( s => s.title == value.title);
             });
             resolve(source);
           })
       })
   }); 
  }
  getByTiendaDivisionDepart(date_filter: DateFilter,tienda:number,division:string,depart:number){

    return new Promise(resolve => {
      this.operadorProvider.getByTiendaDivisionDepart(date_filter.fecha_ini_start,date_filter.fecha_ini_end,tienda,division,depart,500).then((rs) => {
       let source_ini = Item.Map(rs);
   
       this.operadorProvider.getByTiendaDivisionDepart(date_filter.fecha_fin_start,date_filter.fecha_fin_end,tienda,division,depart,500).then((rs) => {
           
             let source_aa = Item.Map(rs);
            
             let source=this.mergeSource(source_ini.deptos, function(value){
               return source_aa.deptos.find( s => s.title == value.title);
             });
             resolve(source);
           })
       })
   }); 
  }
  getByTiendaDivisionDepartSubdepart(date_filter: DateFilter,tienda:number,division:string,depart:number,subdepart:number){
    return new Promise(resolve => {
      this.operadorProvider.getByTiendaDivisionDepartSubdepart(date_filter.fecha_ini_start,date_filter.fecha_ini_end,tienda,division,depart,subdepart,500).then((rs) => {
       let source_ini = Item.Map(rs);
   
       this.operadorProvider.getByTiendaDivisionDepartSubdepart(date_filter.fecha_fin_start,date_filter.fecha_fin_end,tienda,division,depart,subdepart,500).then((rs) => {
           
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
