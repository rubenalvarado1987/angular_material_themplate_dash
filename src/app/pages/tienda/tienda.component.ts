import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DateFilter } from '../../../model/date-filter.model';
import { MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { TiendaService } from '@services/tienda/tienda.service';
import { BaseBoxItemsComponent } from '../components/base-box-items.component';
import { Http } from '@angular/http';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  // styleUrls: ['./tienda.component.css']
})
export class TiendaComponent extends BaseBoxItemsComponent implements OnInit {
  public date_filter: DateFilter;
  public tiendaSvc: TiendaService;
  constructor(public http: Http,  public router: Router) {
    super()
  
    this.instance = this;
  }

  ngOnInit() {


  }

  Init(cadenas:number[]) {

    this.resetNavegacion();
    this.gridview.tituloActivo = "Tienda";
    this.tiendaSvc= new TiendaService(this.http,cadenas);
    this.tiendaSvc.getAll(this.date_filter, 0).then(rs => {
      this.gridviewDetalle[this.index].dataTable = rs;
    }
    );
  }
}
