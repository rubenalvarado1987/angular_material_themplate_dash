import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DateFilter } from '@model/date-filter.model';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  datePickerStart: any;
  datePickerEnd: any;
  date_filter: DateFilter;
  imgActiva: number;
  loadPage=false;


  @Output()
  eventChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: Router, private router: ActivatedRoute) {
    this.imgActiva = 1;
    router.queryParams
      .subscribe(params => {
         this.date_filter =  new DateFilter();

         if(params.ini_start!==undefined){
           this.date_filter.update(params.ini_start, params.ini_end, params.fin_start, params.fin_end);    
        }
       
      });
     
  }

  hideCalendar(){
    for(var i=0; i < document.getElementsByClassName('calendar right').length; i++){
      document.getElementsByClassName('calendar right').item(i).setAttribute('style','display: none');
    }
  }

  ngOnInit() {
      this.datePickerStart = {   
        startDate: moment().date(this.date_filter.date_ini_start.getDate()),
        endDate: moment().date(this.date_filter.date_ini_end.getDate())
      }

      this.datePickerEnd = {
        startDate: moment().date(this.date_filter.date_fin_start.getDate()).subtract(1, 'year'),
        endDate: moment().date(this.date_filter.date_fin_end.getDate()).subtract(1, 'year')
      }
  }

  changeStart() {
    if(this.loadPage){
      this.setFecha();
      this.findInfoByDate();
    }

  }
  changeEnd() {
    this.setFecha();
    this.findInfoByDate();
    this.loadPage=true;
  }

  findInfoByDate() {
    this.eventChange.emit(this.date_filter);
  }

  initCalendar(){

    this.changeStart();
    this.changeEnd();
    this.findInfoByDate();
  }

  setFecha(){
    this.date_filter.date_ini_start = this.datePickerStart.startDate.toDate();
    this.date_filter.date_ini_end = this.datePickerStart.endDate.toDate();
    this.date_filter.date_fin_start = this.datePickerEnd.startDate.toDate();
    this.date_filter.date_fin_end = this.datePickerEnd.endDate.toDate();
  }
}
