import { Component, OnInit, Input } from '@angular/core';
import { DateFilter } from '../../../model/date-filter.model';
import { IBaseTipoService } from '@interfaces/ibasetiposervice';

export abstract class BaseBoxItemsComponent implements OnInit {
  public instance: BaseBoxItemsComponent;
  public baseTipoSvc: IBaseTipoService;
  public dataTable: any = [];
  public date_filter: DateFilter;
  public  index:number=0;
  @Input() gridviewDetalle: any = [];
  
  public gridview: any = {
    tituloActivo: '...',
    niveles: {
      1: null,
      2: null,
      3: null,
      4: null
    },
    depto: {
      view: '',
      titulo: '',
    },
    arrayTitle: []
  };

  constructor() {
    this.instance = this;

  }

  ngOnInit() {
  
  }

  getDataInit(item) {
    this.index=0;
    this.resetNavegacion();
    this.gridview.tituloActivo = item.descripcion;
    this.baseTipoSvc.getDataByDeptoInit(this.date_filter, item.identificador).then(rs => {
      this.gridviewDetalle[this.index].dataTable = rs;
    });
  }
 

  setTituloActivo(tituloTabla: any, indice: number) {
    this.gridview.depto.view = tituloTabla[indice].indice;
    this.gridview.nivelActivo = indice;

  }

  loadDataTable(objectTable: any, item: any) {

    //SE BUSCA ELEMENTO DE LA LISTA CON EL INDICE EN CUESTION
    var elemento = this.gridviewDetalle.filter(x => x.indice === objectTable.indice)[0];
    elemento.dataTable = null;
    this.baseTipoSvc.init();
    this.baseTipoSvc.getDataGrids(objectTable.agg,this.date_filter, item, elemento);
    this.gridview.niveles[elemento.nivel] = {
      titulo: elemento.titulo,
      indice: elemento.indice,
      descripcion: item.title
    };
    this.gridview.nivelActivo = elemento.nivel;

  }

  resetNavegacion() {
    this.gridview.depto.view =  this.gridviewDetalle[ this.index].indice;
    this.gridview.niveles = {
      1: null,
      2: null,
      3: null,
      4: null
    };
  }
}
