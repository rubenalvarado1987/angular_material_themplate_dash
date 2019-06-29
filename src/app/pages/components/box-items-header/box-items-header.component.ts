import { Component, OnInit, Input } from '@angular/core';
import { DivisionService } from '../../../../services/division/division.service';
import { ResumenDeptoModel } from '@model/resumen-depto.model';
import { BaseBoxItemsComponent } from '../base-box-items.component';
import { DateFilter } from '@model/date-filter.model';
@Component({
  selector: 'box-items-header',
  templateUrl: './box-items-header.component.html',
  // styleUrls: ['./box-items-header.component.css']
})
export class BoxItemsHeaderComponent extends BaseBoxItemsComponent implements OnInit {

  @Input() title:string;
  @Input() source: ResumenDeptoModel;
  @Input() mostrarDepto: boolean = true;
  @Input() titleResumen:string;
  private nameField:string
  private codeField:string
  public date_filter:  DateFilter;

  constructor(public divisionSvc: DivisionService) { 
    super();
    this.source  =new ResumenDeptoModel();
    this.instance = this;
  }
 
  ngOnInit() {

  }
  Init(name_field:string,code_field:string){
    this.nameField=name_field;
    this.codeField=code_field;
    this.baseTipoSvc.getAggSumByDate(this.date_filter,this.titleResumen,name_field,code_field).then(rs=>{
      this.source  =rs;
    });
  }


  getDataDetalle() {
    this.resetNavegacion();
    this.baseTipoSvc.getAggSumByDate(this.date_filter,this.titleResumen,this.nameField,this.codeField).then(rs => {
      this.gridviewDetalle[this.index].dataTable = rs.Deptos;
     });
  }
}
