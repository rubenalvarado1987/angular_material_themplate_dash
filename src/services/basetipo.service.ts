import { DeptoModel } from '@model/depto.model';
import { IProvider } from '@interfaces/iprovider';
import { DateFilter } from '@model/date-filter.model';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { ResumenPorcModel } from '@model/resumen-porc.model';
import { Item } from '@mapper/item';
import { DeptoService } from './depto/depto.service';
import { TiendaService } from './tienda/tienda.service';
import { ProductoService } from './producto/producto.service';
import { ClaseService } from './clase/clase.service';
import { SubDeptoService } from './sub-depto/sub-depto.service';
import { OperadorService } from './operador/operador.service';
import { ItemUpDown } from '@model/Item-up-down.model';
import { IBaseTipoService } from '@interfaces/ibasetiposervice';
import { OrderBy } from '@pipes/order.pipe';


export abstract class BaseTipoService extends BaseService {
  Cadenas: number[]=[];
  Tiendas: number[] = [];
  claseSvc: ClaseService;
  productoSvc: ProductoService;
  tiendaSvc: TiendaService;
  deptoSvc: DeptoService;
  subDeptoSvc: SubDeptoService;
  operadorSvc: OperadorService;
  order: OrderBy;
  constructor(public http: Http) {
    super();
  }
  protected initChild(): void { };

  init() {
    this.tiendaSvc = new TiendaService(this.http, this.Cadenas, this.Tiendas);
    this.deptoSvc = new DeptoService(this.http, this.Cadenas, this.Tiendas);
    this.subDeptoSvc = new SubDeptoService(this.http, this.Cadenas, this.Tiendas);
    this.claseSvc = new ClaseService(this.http, this.Cadenas, this.Tiendas);
    this.productoSvc = new ProductoService(this.http, this.Cadenas, this.Tiendas);
    this.operadorSvc = new OperadorService(this.http, this.Cadenas, this.Tiendas);
    this.order = new OrderBy();

    this.initChild();
  }
  getAggPorcByDateField(S: IBaseTipoService, P: IProvider, name_field: string, date_filter: DateFilter, isUptienda: boolean, isDownTienda: boolean, isAscOrder:boolean): ResumenPorcModel {
    let resumen = new ResumenPorcModel();

    P.getAggPorcByTipo(name_field, date_filter.fecha_ini_start, date_filter.fecha_ini_end).then((rs) => {

      let agg_depto = Item.Map(rs);

      P.getAggPorcByTipo(name_field, date_filter.fecha_fin_start, date_filter.fecha_fin_end).then((rs) => {
        let agg_depto_aa = Item.Map(rs);

        let pesoItems;
        P.getPesoByTipo(date_filter.fecha_ini_start, date_filter.fecha_ini_end, agg_depto.sum_tsc, 500, "asc").then((rs) => {
          pesoItems = rs;

          agg_depto.deptos.forEach(d => {
            let depto_aa = agg_depto_aa.deptos.find(s => s.descripcion == d.descripcion);
            let depto: DeptoModel;
            depto = new DeptoModel(d);
            if (depto_aa != null) {
              depto.vta_interes = 0;
              depto.cuota_promedio = 0;
              depto.pct_tsc_porc = d.pct_tsc_porc;
              depto.pct_tsc_aa = d.pct_tsc_aa;
              depto.pct_tsc_porc_aa = depto_aa.pct_tsc_porc;
              depto.diff_pct = d.pct_tsc_porc - depto_aa.pct_tsc_porc;
              depto.diff_vta_tsc = d.sum_vta_tsc - depto_aa.sum_vta_tsc
            }

            if (isUptienda || isDownTienda) {
              S.getTiendasByTipo(date_filter, d.descripcion).then(rs => {
                if (isDownTienda)  
                    resumen.items_down.push(new ItemUpDown(d.descripcion, this.order.transform(rs, "diff_vta_tsc_amt")))

                if(isUptienda)
                    resumen.items_up.push(new ItemUpDown(d.descripcion, this.order.transform(rs, "diff_vta_tsc_amt", isAscOrder)))
                else 
                    this.deptoSvc.getDepartByDivision(date_filter, d.identificador).then(rs => {
                      resumen.items_up.push(new ItemUpDown(d.descripcion, this.order.transform(rs, "diff_vta_tsc_amt")))

                    });
              })
            } else {
              this.deptoSvc.getDepartByDivision(date_filter, d.identificador).then(rs => {
              //  resumen.items_up.push(new ItemUpDown(d.descripcion, this.order.transform(rs, "diff_vta_tsc_amt")))
                resumen.items_down.push(new ItemUpDown(d.descripcion, this.order.transform(rs, "diff_vta_tsc_amt",true,4)))
              });
            }
            let pesoItem = pesoItems.find(i => i.key == d.title);
            depto.peso_tsc = (pesoItem !== undefined) ? pesoItem.peso_tsc.value : 0;
            resumen.Deptos.push(depto);

          })
        })

      });

    });

    return resumen;

  }

  getAggSumDetalleByField(T: IProvider, field: string, date_filter: DateFilter) {
    return new Promise(resolve => {
      T.getAggPorcByTipo(field, date_filter.fecha_ini_start, date_filter.fecha_ini_end).then((rs) => {

        let agg_cuota = Item.Map(rs);

        T.getAggPorcByTipo(field, date_filter.fecha_fin_start, date_filter.fecha_fin_end).then((rs) => {

          let agg_cuota_aa = Item.Map(rs);

          let source = this.mergeSource(agg_cuota.deptos, function (value) {
            return agg_cuota_aa.deptos.find(s => s.descripcion == value.descripcion);
          });
          resolve(source);
        });
      });
    });
  }
}


