  import { Component, OnInit, Input } from '@angular/core';
import { ResumenPorcModel } from '@model/resumen-porc.model';
import { DateFilter } from '@model/date-filter.model';
import { IBaseTipoService } from '@interfaces/ibasetiposervice';
 
@Component({
  selector: 'box-resumen',
  templateUrl: './box-resumen.component.html',
})
export class BoxResumenComponent  implements OnInit {

  @Input() source: ResumenPorcModel;
  @Input() isUpTienda:boolean=true;
  @Input() isDownTienda:boolean=true;
  @Input() isAscOrder:boolean=false;
  public baseTipoSvc: IBaseTipoService ;
  public date_filter: DateFilter;

  constructor() {

    this.source  =new ResumenPorcModel();
 
  }
  ngOnInit() {
  
  }

  getItemsFromDescripcion(items, descripcion){
   let _items =items.filter(x => x.descripcion === descripcion);
 
    return _items.length>0 ? _items[0].items :[]
  }
 
  Init(){
     this.source   = this.baseTipoSvc.getAggPorcByDate(this.date_filter,this.isUpTienda,this.isDownTienda,this.isAscOrder);
    
  }

  getRanking(peso_tsc: number): any[] {
   let n=1;
   if(peso_tsc>=10 && peso_tsc<=15) n=2;
   else if (peso_tsc>15) n=3;
   
   return Array(n);
  }
   
  sortData(data){
   return data.sort((a,b)=>b.peso_tsc -a.peso_tsc)
  }
}
