import { DateFilter } from '@model/date-filter.model';
import { ResumenPorcModel } from '@model/resumen-porc.model';

export interface IBaseTipoService {
    Cadenas:number[];
    Tiendas:number[];
    init();
    getAggSumByDate(date_filter: DateFilter,title_resumen?:string,name_field?:string,code_field?:string) 
    getAggPorcByDate(date_filter:DateFilter,isUpTienda:boolean,isDownTienda:boolean,isAscOrder:boolean): ResumenPorcModel;
    getAggByTipoDate(date_filter: DateFilter);
    getDataHeaderDetalleInit(date_filter: DateFilter);
    getDataByDeptoInit(date_filter: DateFilter,codigo:number);
    getDataByTiendaInit(date_filter: DateFilter,tipo:string);
    getDataGrids(agg: string, date_filter: DateFilter, items: any, elemento: any);
    getTiendasByTipo(date_filter: DateFilter,tipo:string);
}
