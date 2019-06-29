import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ProductoProvider } from '@providers/rest/producto/producto.provider';
import { Http } from '@angular/http';
import { DateFilter } from '@model/date-filter.model';
import { Item } from '@mapper/item';

 
export class ProductoService extends BaseService {
  productoProvider: ProductoProvider
  constructor(http:Http,cadenas:number[]=[] ,tiendas:number[]=[]) {
    super();
    this.productoProvider= new ProductoProvider(cadenas,http)
    this.productoProvider.tiendas=tiendas;
   }
   getProductoBySubdepart(date_filter: DateFilter, depart: number, subdepto:number) {
    return new Promise(resolve => {
      this.productoProvider.getProductoBySubdepart(date_filter.fecha_ini_start,date_filter.fecha_ini_end,depart,subdepto,500).then((rs) => {
        let source_ini = Item.Map(rs);
        this.productoProvider.getProductoBySubdepart(date_filter.fecha_fin_start,date_filter.fecha_fin_end,depart,subdepto,500).then((rs) => {
            
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
  
  }
  getMarcaProductoByDepart(date_filter: DateFilter, depto: number) {
    return new Promise(resolve => {
      this.productoProvider.getMarcaProductoByDepart(date_filter.fecha_ini_start,date_filter.fecha_ini_end,depto,500).then((rs) => {
        let source_ini = Item.Map(rs);
        this.productoProvider.getMarcaProductoByDepart(date_filter.fecha_fin_start,date_filter.fecha_fin_end,depto,500).then((rs) => {
            
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
  
  }
  getMarcaBySubdepartamentoClase(date_filter: DateFilter, depto:number, subdpto: number, clase: number) {
    return new Promise(resolve => {
      this.productoProvider.getMarcaSubdepartamentoClase(date_filter.fecha_ini_start,date_filter.fecha_ini_end,depto,subdpto,clase,500).then((rs) => {
        let source_ini = Item.Map(rs);
        this.productoProvider.getMarcaSubdepartamentoClase(date_filter.fecha_fin_start,date_filter.fecha_fin_end,depto,subdpto,clase,500).then((rs) => {
            
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
  
  }
  getSubdepartamentoByMarca(date_filter: DateFilter, depto:number, marca: string) {
    return new Promise(resolve => {

      this.productoProvider.getSubdepartamentoByMarca(date_filter.fecha_ini_start,date_filter.fecha_ini_end,depto,marca,500).then((rs) => {
        let source_ini = Item.Map(rs);
        this.productoProvider.getSubdepartamentoByMarca(date_filter.fecha_fin_start,date_filter.fecha_fin_end,depto,marca,500).then((rs) => {
            
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
  
  }
  getProductosBySubdepartMarca(date_filter: DateFilter, depto:number ,subdepto:number, marca: string) {
    return new Promise(resolve => {

      this.productoProvider.getProductosBySubdepartMarca(date_filter.fecha_ini_start,date_filter.fecha_ini_end,depto,subdepto,marca,500).then((rs) => {
        let source_ini = Item.Map(rs);
        this.productoProvider.getProductosBySubdepartMarca(date_filter.fecha_fin_start,date_filter.fecha_fin_end,depto,subdepto,marca,500).then((rs) => {
            
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
  
  }

  getByTiendaDivisionDeptoSubDepto(date_filter: DateFilter,tienda:number, division : string, depto : number, subdepto : number) {
    
    return new Promise(resolve => {

      this.productoProvider.getByTiendaDivisionDeptoSubDepto(date_filter.fecha_ini_start,date_filter.fecha_ini_end,tienda, division , depto, subdepto,500).then((rs) => {
        let source_ini = Item.Map(rs);
        this.productoProvider.getByTiendaDivisionDeptoSubDepto(date_filter.fecha_fin_start,date_filter.fecha_fin_end,tienda, division , depto, subdepto,500).then((rs) => {        
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
  
  }
  getTiendasByDepartMarca(date_filter: DateFilter, depto : number, marca : string) {
    return new Promise(resolve => {

      this.productoProvider.getTiendasByDepartMarca(date_filter.fecha_ini_start,date_filter.fecha_ini_end, depto, marca,500).then((rs) => {
        let source_ini = Item.Map(rs);
        this.productoProvider.getTiendasByDepartMarca(date_filter.fecha_fin_start,date_filter.fecha_fin_end, depto, marca,500).then((rs) => {        
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
  
  }
  getTiendasByDptoSubdeptoClaseSku(date_filter: DateFilter, depto : number, sub_dpto : number, clase: number, sku: number) {
    return new Promise(resolve => {

      this.productoProvider.getTiendasByDptoSubdeptoClaseSku(date_filter.fecha_ini_start,date_filter.fecha_ini_end, depto, sub_dpto, clase, sku,500).then((rs) => {
        let source_ini = Item.Map(rs);
        this.productoProvider.getTiendasByDptoSubdeptoClaseSku(date_filter.fecha_fin_start,date_filter.fecha_fin_end, depto, sub_dpto, clase, sku,500).then((rs) => {        
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
  
  }
  getTiendasByDptoSubdeptoSku(date_filter: DateFilter, depto : number, sub_dpto : number, sku: number) {
    return new Promise(resolve => {

      this.productoProvider.getTiendasByDptoSubdeptoSku(date_filter.fecha_ini_start,date_filter.fecha_ini_end, depto, sub_dpto, sku,500).then((rs) => {
        let source_ini = Item.Map(rs);
        this.productoProvider.getTiendasByDptoSubdeptoSku(date_filter.fecha_fin_start,date_filter.fecha_fin_end, depto, sub_dpto, sku,500).then((rs) => {        
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
  
  }

  getTiendasByMarcaSubdepto(date_filter: DateFilter, marca : string, sub_dpto: number) {
    return new Promise(resolve => {

      this.productoProvider.getTiendasByMarcaSubdepto(date_filter.fecha_ini_start,date_filter.fecha_ini_end, marca, sub_dpto,500).then((rs) => {
        let source_ini = Item.Map(rs);
        this.productoProvider.getTiendasByMarcaSubdepto(date_filter.fecha_fin_start,date_filter.fecha_fin_end, marca, sub_dpto,500).then((rs) => {        
              let source_aa = Item.Map(rs);
      
              let source=this.mergeSource(source_ini.deptos, function(value){
                return source_aa.deptos.find(s => s.title == value.title);
              });
              resolve(source);
            })
        })
    });
  
  }
  getTiendasByDptoSubdeptoSkuMarca(date_filter: DateFilter, depto : number, sub_dpto : number, sku: number, marca:string) {
    return new Promise(resolve => {

      this.productoProvider.getTiendasByDptoSubdeptoSkuMarca(date_filter.fecha_ini_start,date_filter.fecha_ini_end, depto, sub_dpto, sku,marca,500).then((rs) => {
        let source_ini =Item.Map(rs);
        this.productoProvider.getTiendasByDptoSubdeptoSkuMarca(date_filter.fecha_fin_start,date_filter.fecha_fin_end, depto, sub_dpto, sku,marca,500).then((rs) => {        
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
