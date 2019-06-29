import { Http} from '@angular/http';
import { BaseProvider } from '../base.provider'
 
 
export class DeptoProvider extends BaseProvider {
  constructor( http: Http,cadenas:number[]) {    
    super('agg_tienda_clase',cadenas,http)
  }
 
  getDepartByDivision(fecha_ini: number, fecha_fin: number, division: number, size: number) {
    return this.getAggSumByfields([
      {
        "desc_depart": {
          "terms": {
            "field": "desc_depart.keyword"
          }
        }
      },
      {
        "depart": {
          "terms": {
            "field": "depart"
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
        "identificador": {
          "terms": {
            "field": "division"
          }
        }
      },
      {
        "title": {
          "terms": {
            "field": "desc_depart.keyword"
          }
        }
      }

    ],
    [{
      "term": {
        "division":  division 
      }
    }],fecha_ini,fecha_fin,size);   
  }


  getByTiendaDivision(fecha_ini: number, fecha_fin: number, tienda: number,division:string, size: number){
  
    return this.getAggSumByfields( [
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

        "depart": {
          "terms": {
            "field": "depart"
          }
        }
      },
      
      {

        "title": {
          "terms": {
            "field": "title.keyword"
          }
        }
      }
    ],
    [  
       {
        "term": { "numctl": tienda }
       },
       {
        "regexp": {
          "desc_division.keyword": ".*" + division+".*"
        }
      }],fecha_ini,fecha_fin,size);   
  }

  getByTiendaDivisionOp(fecha_ini: number, fecha_fin: number, tienda: number,division:string, size: number){
    
    return this.getAggSumByfields( [
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

        "depart": {
          "terms": {
            "field": "depart"
          }
        }
      },
      
      {

        "title": {
          "terms": {
            "field": "desc_depart.keyword"
          }
        }
      }
    ],
    [  
       {
        "term": { "numctl": tienda }
       },
       {
        "regexp": {
          "desc_division.keyword": ".*" + division+".*"
        }
      }],fecha_ini,fecha_fin,size);   
  }

  getUpDownByDepto(fecha_ini: number,fecha_fin: number,division: string,sum_vta_tsc:number ,size: number,order:string) {
 
    return this.getUpDownByField(fecha_ini,fecha_fin, "desc_depart.keyword",sum_vta_tsc,size,order);
  }
}
