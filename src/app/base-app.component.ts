import { ViewChild, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IBaseTipoService } from '@interfaces/ibasetiposervice';
import { ParentChildService } from './parent-child.service';
import { BoxItemsHeaderComponent } from './pages/components/box-items-header/box-items-header.component';
import { BoxResumenComponent } from './pages/components/box-resumen/box-resumen.component';
import { BoxItemsGridComponent } from './pages/components/box-items-grid/box-items-grid.component';
import { DateFilter } from '@model/date-filter.model';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { ActivatedRoute } from '@angular/router';

export abstract class BaseAppComponent implements OnDestroy {
  title = 'sales-rf-display';
  @ViewChild(BoxItemsHeaderComponent) boxHeader: BoxItemsHeaderComponent;
  @ViewChild(TiendaComponent) viewTienda: TiendaComponent;
  @ViewChild(BoxItemsGridComponent) boxItemsGrid: BoxItemsGridComponent;
  @ViewChild(BoxResumenComponent) boxResumen: BoxResumenComponent;


  @Input() date_filter: DateFilter;
  public subscription: Subscription;
  private parentChildService: ParentChildService;
  public tipoSvc: IBaseTipoService;
  public nameField:string
  public codeField:string
  titleResumen: string;


  constructor(route: ActivatedRoute, childservice: ParentChildService, tipoService: IBaseTipoService) {
    this.subscription = new Subscription();
    this.parentChildService = childservice;
    this.tipoSvc = tipoService;
 
    route.queryParams
      .subscribe(params => {
        this.tipoSvc.Cadenas =  typeof(params.cadenas)==="string" ? [  Number.parseInt(params.cadenas)]:  params.cadenas !== undefined ?params.cadenas:[1];
        this.tipoSvc.Tiendas = params.tiendas;
      });

    this.titleResumen = this.tipoSvc.Cadenas[0] == 1 ? "paris" : "johnson";
    this.tipoSvc.init();

  }

  ngOnInit() {
    this.subscription = this.parentChildService.on('findInfoByDate').subscribe(d => this.findInfoByDate(d));

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }
  protected execute(date_filter: DateFilter): void { };


  private findInfoByDate(date_filter) {

    if (this.boxHeader !== undefined) {
      this.boxHeader.date_filter = date_filter;
      this.boxHeader.baseTipoSvc = this.tipoSvc;
      this.boxHeader.Init(this.nameField,this.codeField);
    }
    if (this.boxResumen !== undefined) {
      this.boxResumen.date_filter = date_filter;
      this.boxResumen.baseTipoSvc = this.tipoSvc;
      this.boxResumen.Init();
    }

    if (this.boxItemsGrid !== undefined) {
      this.boxItemsGrid.date_filter = date_filter;
      this.boxItemsGrid.baseTipoSvc = this.tipoSvc;
      this.boxItemsGrid.Init();
    }


    this.execute(date_filter);

  }
}