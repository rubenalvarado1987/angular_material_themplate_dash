import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { TiendaProvider } from '@providers/rest/tienda/tienda.provider';
import { Http } from '@angular/http';
import { DateFilter } from '@model/date-filter.model';
import { Item } from '@mapper/item';

export class TiendaService extends BaseService {
  tiendaProvider: TiendaProvider;
  constructor(http: Http,cadenas:number[]=[],tiendas:number[]=[]) {
    super();
    this.tiendaProvider = new TiendaProvider(cadenas,http);
    this.tiendaProvider.tiendas=tiendas;
  }

  getAll(date_filter: DateFilter, depto: number) {
    return new Promise(resolve => {
      this.tiendaProvider.getAll(date_filter.fecha_ini_start,date_filter.fecha_ini_end).then((rs) => {
        let source_ini = Item.Map(rs);
        this.tiendaProvider.getAll(date_filter.fecha_fin_start,date_filter.fecha_fin_end).then((rs) => {
            
              let source_aa = Item.Map(rs);
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
   }
  
getTiendaBySubdepartamento(date_filter: DateFilter, dpto:number ,subdpto: number) {
    return new Promise(resolve => {
      this.tiendaProvider.getTiendaBySubdepartamento(date_filter.fecha_ini_start,date_filter.fecha_ini_end,dpto,subdpto,500).then((rs) => {
        let source_ini = Item.Map(rs);
    
        this.tiendaProvider.getTiendaBySubdepartamento(date_filter.fecha_fin_start,date_filter.fecha_fin_end,dpto,subdpto,500).then((rs) => {
            
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
   }
 
   getTiendaByDepto(date_filter: DateFilter, depto: number) {
    return new Promise(resolve => {
      this.tiendaProvider.getTiendaByDepto(date_filter.fecha_ini_start,date_filter.fecha_ini_end,depto,500).then((rs) => {
        let source_ini = Item.Map(rs);
    
        this.tiendaProvider.getTiendaByDepto(date_filter.fecha_fin_start,date_filter.fecha_fin_end,depto,500).then((rs) => {
            
              let source_aa = Item.Map(rs);
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
   }
   getTiendaBySubdepartamentoClase(date_filter: DateFilter, depto:number, subdpto: number, clase: number) {
    return new Promise(resolve => {
      this.tiendaProvider.getTiendaBySubdepartamentoClase(date_filter.fecha_ini_start,date_filter.fecha_ini_end,depto,subdpto,clase,500).then((rs) => {
        let source_ini = Item.Map(rs);
    
        this.tiendaProvider.getTiendaBySubdepartamentoClase(date_filter.fecha_fin_start,date_filter.fecha_fin_end,depto,subdpto,clase,500).then((rs) => {
            
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
   }

    getByZona(date_filter:DateFilter, zona: string){
      return new Promise(resolve => {
        this.tiendaProvider.getByZona(date_filter.fecha_ini_start,date_filter.fecha_ini_end,zona,5000).then((rs) => {
         let source_ini = Item.Map(rs);
     
         this.tiendaProvider.getByZona(date_filter.fecha_fin_start,date_filter.fecha_fin_end,zona,5000).then((rs) => {
             
               let source_aa = Item.Map(rs);
              
               let source=this.mergeSource(source_ini.deptos, function(value){
                 return source_aa.deptos.find( s => s.numctl == value.numctl);
               });
               resolve(source);
             })
         })
     });  
    }

    getTiendasByDivision(date_filter:DateFilter, division: string):any{
      return new Promise(resolve => {
        this.tiendaProvider.getTiendasByDivision(date_filter.fecha_ini_start,date_filter.fecha_ini_end,division,5000).then((rs) => {
          let source_ini = Item.Map(rs);
      
          this.tiendaProvider.getTiendasByDivision(date_filter.fecha_fin_start,date_filter.fecha_fin_end,division,5000).then((rs) => {
              
                let source_aa = Item.Map(rs);
        
                let source=this.mergeSource(source_ini.deptos, function(value){
                  return source_aa.deptos.find(s => s.title == value.title);
                });
                resolve(source);
              })
          })
      });
    }
  }
