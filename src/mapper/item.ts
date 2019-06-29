import { DeptoCuotaModel } from '@model/depto-cuota.model';
import { BaseAggModel } from '@model/base-agg.model';

export  class Item {
        public static Map(doc: any = []) {
            let items: Array< DeptoCuotaModel> = [];
            let sum_retail = 0;
            let sum_tsc = 0;
            let sum_pushpartner_sobre_meta = 0.00;
            let sum_recargo=0;
            let sum_tsc_0_11=0, sum_tsc_12_23=0,sum_tsc_24=0;
            let sum_interes=0;
            let sum_cuota_avg=0;
           let  sum_trans=0;
            doc.forEach(function (rs) {
           
              sum_retail = sum_retail + rs.sum_vta_retail.value;
              sum_tsc = sum_tsc + rs.sum_vta_tsc.value;
              sum_pushpartner_sobre_meta = sum_pushpartner_sobre_meta + rs.sum_pushpartner_sobre_meta.value;
              sum_recargo=sum_recargo+  rs.sum_vta_recargo.value
              sum_interes = (sum_tsc_0_11+rs.vta_tsc_0_11.value) + (sum_tsc_12_23+rs.vta_tsc_12_23.value) + (sum_tsc_24+rs.vta_tsc_24.value);
              sum_cuota_avg=sum_cuota_avg+rs.cuota_avg.value;
              sum_trans=sum_trans+rs.ucount_trx_tsc.value;
           
              let item = new DeptoCuotaModel(new BaseAggModel(
                rs.key.descripcion!==undefined &&  (typeof rs.key.descripcion  ==='string') &&  rs.key.descripcion.split("-")[1]!==undefined ? rs.key.descripcion.split("-")[1].trim(): rs.key.descripcion,
                rs.sum_vta_retail.value,
                rs.sum_vta_tsc.value,
                rs.sum_vta_recargo.value,
                rs.sum_pushpartner_sobre_meta.value,
                rs.pct_tsc.value
              ));
          
              item.count = rs.ucount_trx.value;
              item.count_trans = rs.ucount_trx_tsc.value;
              item.cuota_avg = rs.cuota_avg.value;
              item.desc_division = rs.key.desc_division;
              item.desc_depart = rs.key.desc_depart;
              item.desc_subdepto = rs.key.desc_subdepto;
              item.desc_clase = rs.key.desc_clase;
              item.marca = rs.key.marca;
              item.sum_vta_tsc_0_11 = rs.vta_tsc_0_11.value;
              item.sum_vta_tsc_12_23 = rs.vta_tsc_12_23.value;
              item.sum_vta_tsc_24 = rs.vta_tsc_24.value;
              item.tipo = rs.key.tipo;
              item.numctl  =rs.key.numctl;
              item.depart=rs.key.depart;
              item.subdepto=rs.key.subdepto;
              item.title=rs.key.title;
              item.identificador=rs.key.identificador;
              items.push(item)
        
            });
                 return Object.assign({}, { "deptos": items }, {"sum_retail": sum_retail,"sum_recargo":sum_recargo ,"sum_tsc": sum_tsc, "sum_pushpartner_sobre_meta": sum_pushpartner_sobre_meta,"sum_interes":sum_interes,"sum_cuota_avg":sum_cuota_avg ,"sum_trans":sum_trans});
         
          }
 
}