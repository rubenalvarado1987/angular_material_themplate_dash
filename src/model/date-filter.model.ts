
import { Injectable,Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
  })

export class DateFilter {
   app:string;
   date: Date = new Date();
   date_ini_start: Date;
   date_ini_end: Date;
   date_fin_start: Date;
   date_fin_end: Date;
  fecha_ini_start : number;
  fecha_ini_end:number;
  fecha_fin_start:number;
  fecha_fin_end:number;

   constructor(){
    this.date_ini_start =  moment().startOf('month').subtract(1, 'year').toDate() ;
    this.date_ini_end=new Date();
    this.date_fin_start =moment().startOf('month').subtract(1, 'year').toDate();
    this.date_fin_end = moment().subtract(1, 'year').toDate()
    this.refresh();
   };

   update(date_ini_start:number,date_ini_end:number,date_fin_start:number,date_fin_end:number){
   
    this.date_ini_start =this.getToDate(date_ini_start) ;
    this.date_ini_end=this.getToDate(date_ini_end);
    this.date_fin_start =this.getToDate((date_fin_start));
    this.date_fin_end = this.getToDate(date_fin_end);
    this.fecha_ini_start =  date_ini_start;
    this.fecha_ini_end = date_ini_end;
    this.fecha_fin_start =date_fin_start;
    this.fecha_fin_end =  date_fin_end;
    
   }

   refresh(){
    this.fecha_ini_start = this.getDateShort(this.date_ini_start)
    this.fecha_ini_end = this.getDateShort(this.date_ini_end)
    this.fecha_fin_start = this.getDateShort(this.date_fin_start)
    this.fecha_fin_end = this.getDateShort(this.date_fin_end)
   }

  private getDateShort(date: Date): number {
    return Number.parseInt( moment(date).format('YYYYMMDD'));
  }

  private getToDate(date:number){
   return moment(date).toDate();
  }
  
}
