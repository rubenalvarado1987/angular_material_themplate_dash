import {Component,ViewChild, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParentChildService } from './parent-child.service';
import { DateFilter } from '@model/date-filter.model';


@Component({
  selector: 'master',
  templateUrl: './master.component.html',
})


export class MasterComponent {
  title = 'Master';
 
  date_filter: DateFilter;
  queryParams:any={};
  executeAction: EventEmitter <any> = new EventEmitter();
 
  
constructor(private comparentchildservice:  ParentChildService,private router:  Router, private activeRoute:  ActivatedRoute){
}

change(dateFilter){
  
   this.date_filter=dateFilter;
   this.date_filter.refresh();
      this.queryParams= {
          ini_start :   this.date_filter.fecha_ini_start,
          ini_end : this.date_filter.fecha_ini_end,
          fin_start : this.date_filter.fecha_fin_start,
          fin_end:this.date_filter.fecha_fin_end
        }
     this.comparentchildservice.publish('findInfoByDate', this.date_filter);
}
 
 
  goToPage(path,cadenas:number[]=[],tiendas:number[]=[]) {
    this.queryParams.cadenas=cadenas;
    this.queryParams.tiendas=tiendas;
    this.router.navigate(['/'+path],{queryParams:  this.queryParams} );
  }



 
  ngAfterViewInit() {
  
    // this.date_filter=this.viewHeader.getDateFilter();

  }
}