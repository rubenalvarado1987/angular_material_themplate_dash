import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { GridviewDetalle } from '../../../../model/division/gridview-detalle.model';
import { MatPaginator, MatSort, MatSortable, MatTableDataSource, MatOption, MatSelect, MatMenu, MatIcon, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material';
import * as XLSX from 'xlsx';



export interface RowData {
  title: string;
  sum_vta_retail:number;
  sum_vta_tsc:number;
  pct_tsc_porc:number;
  sum_pushpartner_sobre_meta:number;
  sum_vta_recargo:number;
  vta_interes:number;
  cuota_promedio:number;
  count:number;
}

@Component({
  selector: 'gridview-detalle',
  templateUrl: './detalle.component.html',
  
  // styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit  {
    
    @Input() showWhen: number= 1;
    @Input() _buttons: any=null;
    @Input() _dataTable: MatTableDataSource<RowData>;
    @Input() gridview:any=null;
    @Input() _parent:any=null;
    @Input() loadDataMethodName:string=null;
    public showLoaging:boolean=true;
    public displayedColumns: string[]=['title','sum_vta_retail','sum_vta_tsc','pct_tsc_porc','sum_pushpartner_sobre_meta','sum_vta_recargo','vta_interes','cuota_promedio','count','botones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public showDropDownButton: boolean = false;
    public filterFormControl = new FormControl('', [
    ]);
    @ViewChild('table') table: ElementRef;
    public rawData:any= null;
    //public idCadena: number;

  @Input()
  set dataTable(dataTable: any) {
    this.rawData = dataTable;
    if(dataTable !== null && dataTable !== undefined){
   
      dataTable.forEach(row => {
 
        if(row.title != undefined && row.title != "undefined" && (typeof row.title === "string") ){
             let arrTitle=row.title.split('- ');

              row.title  = arrTitle.length>1 ? arrTitle[1]:  arrTitle[0];
                if(row.title.length === 9 && Number.isInteger(parseInt(row.title))){
                    if (this._parent.baseTipoSvc.Cadenas[0] == 1){
                      row.showLink = true;
                    }
                }
        }
            
      });
      this.showLoaging=false;
    }

    this._dataTable =dataTable!=null? new MatTableDataSource(dataTable):new MatTableDataSource([]);
 
    this._dataTable.paginator = this.paginator;
     if(this.sort !== undefined){
        this.sort.disableClear=true;
     }
 
    this._dataTable.sort = this.sort;
  }
  get dataTable() {
    return this._dataTable;
  }
  @Input()
  set parent(parent: any) {
    this._parent=parent;
  }
  get parent() {
    return this._parent
  }

  @Input()
  set buttons(value: any) {
    this._buttons = value;
    if(this._buttons !== undefined){
      this.showDropDownButton = true;
    }
  }
  get buttons() {
    return  this._buttons;
  }


  constructor(public gridviewDetalle :GridviewDetalle) {
  }

  ngOnInit() {
  }
 
  setZIndex(){
    document.getElementsByClassName('cdk-overlay-container').item(0).setAttribute('style','z-index:2050 !important');
  }

  setSelected(btn: any, item: any){
    this.gridview.arrayTitle.push({
      indice:btn.indice,
      padre: btn.padre,
      indicePadre: btn.indicePadre,
      titulo : btn.padre + ' / ' + item.title
    });
  
    this.gridview.depto.view = btn.indice;

    if(this._parent !== null && this.loadDataMethodName !== null){
      
      this._parent[this.loadDataMethodName](btn,item);
   
    }

  }


  showItem(item: any){

    return !(item !== null 
      && item !== undefined 
      && item.pct_tsc !== undefined 
      && item.pct_tsc !== null 
      && item.pct_tsc.value  !== null 
      && item.pct_tsc.value  !== undefined)
  }
  applyFilter(filterValue: string) {
    this._dataTable.filter = filterValue.trim().toLowerCase();

    if (this._dataTable.paginator) {
      this._dataTable.paginator.firstPage();
    }
  }

  downloadTable(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'DetalleLista.xlsx');
  }

  getAnalyticID(btn: any){
    return btn.analyticsID;
  }
}
