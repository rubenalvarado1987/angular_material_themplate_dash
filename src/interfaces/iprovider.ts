

export interface IProvider {
    doc_index: string;
    getAggByTipo(field: string, fechaIni: number, fechaFin, codigo?: string)
    getAggPorcByTipo(field: string, fechaIni: number, fechaFin, codigo?: string)
    getPesoByTipo(fecha_ini: number, fecha_fin: number, sum_vta_tsc: number, size: number, order: string);

}
