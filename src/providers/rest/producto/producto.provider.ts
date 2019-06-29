import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { BaseProvider } from '../base.provider';


export class ProductoProvider extends BaseProvider {

  constructor( cadenas:number[], http: Http) {
    super('agg_sku_tienda',cadenas,http)
  }

  getProductoBySubdepart(fecha_ini: number, fecha_fin: number, depart: number, subdepto:number, size: number) {
    return this.getAggSumByfields([
      {
        "desc_depart": {
          "terms": {
            "field": "desc_depart.keyword"
          }
        }
      },
      {
        "desc_subdepto": {
          "terms": {
            "field": "desc_subdepto.keyword"
          }
        }
      },
      {
        "title": {
          "terms": {
            "field": "sku.keyword"
          }
        }
      }

    ]
,
    [{
      "term": { "depart": depart }
     },
     {
      "term": { "subdepto": subdepto }
     }
]
,fecha_ini,fecha_fin,size);   
  }

  getMarcaProductoByDepart(fecha_ini: number, fecha_fin: number, depto: number, size: number) {
    return this.getAggSumByfields([
      {
        "marca": {
          "terms": {
            "field": "marca.keyword"
          }
        }
      },
      {
        "desc_depart": {
          "terms": {
            "field": "desc_depart.keyword"
          }
        }
      },
      {
        "title": {
          "terms": {
            "field": "marca.keyword"
          }
        }
      }

    ]
,
    [{
      "term": { "depart": depto }
     }
]
,fecha_ini,fecha_fin,size);   
  }
  getMarcaSubdepartamentoClase(fecha_ini: number, fecha_fin: number, depto: number, subdepto: number, clase: number, size: number) {
    return this.getAggSumByfields([
      {
        "desc_depart": {
          "terms": {
            "field": "desc_depart.keyword"
          }
        }
      },
      {
        "desc_clase": {
          "terms": {
            "field": "desc_clase.keyword"
          }
        }
      },
      {
        "desc_subdepto": {
          "terms": {
            "field": "desc_subdepto.keyword"
          }
        }
      },
      {
        "title": {
          "terms": {
            "field": "sku.keyword"
          }
        }
      }

    ]
,
    [{
      "term": { "depart": depto },
     },
     {
      "term": { "subdepto": subdepto },
     },
     {
      "term": { "clase": clase },
     }
]
,fecha_ini,fecha_fin,size);   
  }
  getSubdepartamentoByMarca(fecha_ini: number, fecha_fin: number, depto: number, marca: string, size: number) {
    return this.getAggSumByfields([
      {
        "marca": {
          "terms": {
            "field": "marca.keyword"
          }
        }
      },
      {
        "desc_depart": {
          "terms": {
            "field": "desc_depart.keyword"
          }
        }
      },
      {
        "desc_subdepto": {
          "terms": {
            "field": "desc_subdepto.keyword"
          }
        }
      },
      {
        "title": {
          "terms": {
            "field": "desc_subdepto.keyword"
          }
        }
      }

    ]
,
    [{
      "term": { "marca.keyword": marca }
     },
     {
      "term": { "depart": depto }
     }
]
,fecha_ini,fecha_fin,size);   
  }
  getProductosBySubdepartMarca(fecha_ini: number, fecha_fin: number, depart:number, subdepto : number, marca: string, size: number) {
    return this.getAggSumByfields([
      {
        "marca": {
          "terms": {
            "field": "marca.keyword"
          }
        }
      },
      {
        "desc_depart": {
          "terms": {
            "field": "desc_depart.keyword"
          }
        }
      },
      {
        "desc_subdepto": {
          "terms": {
            "field": "desc_subdepto.keyword"
          }
        }
      },
      {
        "title": {
          "terms": {
            "field": "sku.keyword"
          }
        }
      }

    ]
,
    [{
      "term": { "marca.keyword": marca }
     },
     {
      "term": { "subdepto": subdepto }
     },
     {
      "term": { "depart": depart }
     }
]
,fecha_ini,fecha_fin,size);   
  }

  getByTiendaDivisionDeptoSubDepto(fecha_ini: number, fecha_fin: number,tienda:number, division : string, depto : number, subdepto : number, size: number) {
 
    return this.getAggSumByfields([
      {
        "desc_tienda": {
          "terms": {
            "field": "desc_tienda.keyword"
          }
        }
      }   ,
      {
        "numctl": {
          "terms": {
            "field": "numctl"
          }
        }
      },
      {
        "desc_division": {
          "terms": {
            "field": "desc_division.keyword"
          }
        }
      }, 
      {

        "desc_depart": {
          "terms": {
            "field": "desc_depart.keyword"
          }
        }
      },
      {
        "desc_subdepto": {
          "terms": {
            "field": "desc_subdepto.keyword"
          }
        }
      },
      {
        "title": {
          "terms": {
            "field": "sku.keyword"
          }
        }
      }

    ]
,
    [ {
      "term": { "numctl": tienda }
     },
      {"regexp": {
        "desc_division.keyword": ".*"+division
    }},
    {
     "term": { "depart": depto }
    },
    {
      "term": { "subdepto": subdepto }
     }
    
]
,fecha_ini,fecha_fin,size);   
  }

  getTiendasByDepartMarca(fecha_ini: number, fecha_fin: number, depto : number, marca : string, size: number) {
    return this.getAggSumByfields([
      {
        "title": {
          "terms": {
            "field": "desc_tienda.keyword"
          }
        }
      }

    ]
,
    [ 
    {
     "term": { "depart": depto }
    },
    {
      "term": { "marca.keyword": marca }
     }
    
]
,fecha_ini,fecha_fin,size);   
  }

  getTiendasByDptoSubdeptoClaseSku(fecha_ini: number, fecha_fin: number, depto : number, sub_dpto: number, clase: number, sku: number, size: number) {
    return this.getAggSumByfields([
      {
        "title": {
          "terms": {
            "field": "desc_tienda.keyword"
          }
        }
      }

    ]
,
    [ 
    {
     "term": { "depart": depto }
    },
    {
      "term": { "subdepto": sub_dpto }
     },
     {
       "term": { "clase": clase }
      },
      {
        "term": { "sku": sku }
       }
    
]
,fecha_ini,fecha_fin,size);   
  }


  getTiendasByDptoSubdeptoSku(fecha_ini: number, fecha_fin: number, depto : number, sub_dpto: number, sku: number, size: number) {
    return this.getAggSumByfields([
      {
        "title": {
          "terms": {
            "field": "desc_tienda.keyword"
          }
        }
      }

    ]
,
    [ 
    {
     "term": { "depart": depto }
    },
    {
      "term": { "subdepto": sub_dpto }
     },
      {
        "term": { "sku": sku }
       }
    
]
,fecha_ini,fecha_fin,size);   
  }

  getTiendasByMarcaSubdepto(fecha_ini: number, fecha_fin: number, marca : string, sub_dpto: number,size: number) {
    return this.getAggSumByfields([
      {
        "title": {
          "terms": {
            "field": "desc_tienda.keyword"
          }
        }
      }

    ]
,
    [ 
    {
      "term": { "marca.keyword": marca }
    },
    {
      "term": { "subdepto": sub_dpto }
     },
]
,fecha_ini,fecha_fin,size);   
  }
  getTiendasByDptoSubdeptoSkuMarca(fecha_ini: number, fecha_fin: number, depto : number, sub_dpto: number, sku: number, marca:string, size: number) {
    return this.getAggSumByfields([
      {
        "title": {
          "terms": {
            "field": "desc_tienda.keyword"
          }
        }
      }

    ]
,
    [ 
    {
     "term": { "depart": depto }
    },
    {
      "term": { "subdepto": sub_dpto }
     },
      {
        "term": { "sku": sku }
       },
       {
         "term": { "marca.keyword": marca }
        }
    
]
,fecha_ini,fecha_fin,size);   
  }

}


