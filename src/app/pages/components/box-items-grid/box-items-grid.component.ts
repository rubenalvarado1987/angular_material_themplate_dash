import { Component, OnInit, Input } from '@angular/core';
import { DateFilter } from '../../../../model/date-filter.model';
import { BaseBoxItemsComponent } from '../base-box-items.component';

@Component({
  selector: 'box-items-grid',
  templateUrl: './box-items-grid.component.html'
})
export class BoxItemsGridComponent extends BaseBoxItemsComponent implements OnInit {
 
  public date_filter: DateFilter;

  @Input() showDepto: boolean = true;
  @Input() showTienda: boolean = true;
  constructor() {
    super()
    this.instance = this;

  }

  ngOnInit() {

  }
  Init(){
    this.baseTipoSvc.getAggByTipoDate(this.date_filter).then(rs=>{
      this.dataTable =rs;
    });
  }
  getDataByDepto(item) {
    this.getDataInit(item);
  }

  getDataByTienda(division: string) {
    this.index=1;
    this.resetNavegacion();
    this.gridview.tituloActivo = division;
  
    this.baseTipoSvc.getDataByTiendaInit(this.date_filter, division).then(rs => {
      this.gridviewDetalle[this.index].dataTable = rs;
    });
  }
}

