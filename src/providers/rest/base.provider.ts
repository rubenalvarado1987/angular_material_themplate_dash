import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment'

export class BaseProvider {
  public doc_index: string;
  tiendas: number[] = [];
  header: any = {};
  host_es: string;

  constructor(doc_index: string, public  cadenas:number[], public http: Http) {
    this.doc_index = doc_index;
    let _header = new Headers();
    _header.append('Access-Control-Allow-Origin', '*');
    this.header = {
      headers: _header
    }
  }

  set SetHost(host_es: string) {
    environment.host_es = host_es;
  }
  get baseURL() {
    return 'http://' + environment.host_es + "/" + this.doc_index + '-*/_search';
  }

  private queryAgg = {
    "sum_vta_retail": {
      "sum": {
        "field": "vta_retail"
      }
    },
    "sum_vta_tsc": {
      "sum": {
        "field": "vta_tsc"
      }
    },
    "sum_vta_recargo": {
      "sum": {
        "field": "vta_recargo"
      }
    },
    "sum_pushpartner_sobre_meta": {
      "sum": {
        "field": "pushpartner_sobre_meta"
      }
    },
    "ucount_trx": {
      "sum": {
        "field": "ucount_trx"
      }
    },
    "ucount_trx_tsc": {
      "sum": {
        "field": "ucount_trx_tsc"
      }
    },
    "vta_tsc_0_11": {
      "sum": {
        "field": "vta_tsc_0_11"
      }
    },
    "vta_tsc_12_23": {
      "sum": {
        "field": "vta_tsc_12_23"
      }
    },
    "vta_tsc_24": {
      "sum": {
        "field": "vta_tsc_24"
      }
    },
    "cuota_avg": {
      "avg": {
        "field": "cuota_avg"
      }
    },
    "pct_tsc": {
      "bucket_script": {
        "buckets_path": {
          "var1": "sum_vta_retail",
          "var2": "sum_vta_tsc"
        },
        "script": "(params.var2 / params.var1)*100 "
      }
    }
  };


  getAggSumByfields(fields: any[], filter_fields: any[], fecha_ini: number, fecha_fin: number, size: number) {
    let newFilter = this.getFilter(filter_fields);

    return new Promise(resolve => {
      this.http.post(this.baseURL, {
        "size": 0,
        "query": {
          "bool": {
            "must": newFilter,
            "filter": [
              {
                "bool": {
                  "must": {
                    "range": {
                      "fectrx": {
                        "gte": fecha_ini,
                        "lte": fecha_fin
                      }
                    }
                  }

                }

              }
            ]
          }
        },
        "aggregations": {
          "groupby": {
            "composite": {
              "size": size,
              "sources": fields
            },
            "aggregations": this.queryAgg
          }
        },
        "sort": [
          {
            "vta_retail": {
              "order": "asc"
            }
          }
        ]
      }, this.header
      ).subscribe(data => {
        let response = data.json();
        resolve(response.aggregations.groupby.buckets);
      }, err => {
        console.log(err);
      });
    });
  }

  getUpDownByField(fecha_ini: number, fecha_fin: number, agg_field: string, sum_vta_tsc: number, size: number, order: string) {
    let newFilter = this.getFilter();

    return new Promise(resolve => {
      this.http.post(this.baseURL, {
        "size": 0,
        "query": {
          "bool":
          {
            "must": newFilter,
            "filter": [
              {
                "bool": {
                  "must": {
                    "range": {
                      "fectrx": {
                        "gte": fecha_ini,
                        "lte": fecha_fin
                      }
                    }
                  }

                }

              }
            ]
          }
        },
        "aggs": {
          "fields": {
            "terms": {
              "size": 5000,
              "field": agg_field
            }, "aggs":

            {
              "sum_vta_retail": {
                "sum": {
                  "field": "vta_retail"
                }
              },
              "sum_vta_tsc": {
                "sum": {
                  "field": "vta_tsc"
                }
              }
              ,
              "pct_tsc": {
                "bucket_script": {
                  "buckets_path": {
                    "var1": "sum_vta_retail",
                    "var2": "sum_vta_tsc"
                  },
                  "script": "(params.var2 / params.var1)*100 "
                }
              },
              "peso_tsc": {
                "bucket_script": {
                  "buckets_path": {
                    "sum_vta_tsc": "sum_vta_tsc"
                  },
                  "script": "(params.sum_vta_tsc * 100) / " + sum_vta_tsc + "L"
                }
              },
              "sales_bucket_sort": {
                "bucket_sort": {
                  "sort": [
                    { "pct_tsc": { "order": order } }
                  ],
                  "size": size
                }
              }
            }
          }
        }
      }, this.header
      ).subscribe(data => {
        let response = data.json();
        resolve(response.aggregations.fields.buckets);
      }, err => {
        console.log(err);
      });
    });
  }

  getAggByFiedls(fields: any[], field: string, fecha_ini: number, fecha_fin: number) {
    let newFilter = this.getFilter([
      {
        "exists": {
          "field": field
        }
      }
    ]);
    return new Promise(resolve => {
      this.http.post(this.baseURL, {
        "size": 0,
        "query": {
          "bool": {
            "must": newFilter,
            "filter": [
              {
                "bool": {
                  "must": [{
                    "range": {
                      "fectrx": {
                        "gte": fecha_ini,
                        "lte": fecha_fin
                      }
                    }
                  }]

                }

              }
            ]
          }
        },
        "aggregations": {
          "groupby": {
            "composite": {
              "size": 10000,
              "sources": fields
            },
            "aggregations": this.queryAgg
          }
        },
        "sort": { [field]: { "order": "asc" } }
      }, this.header
      ).subscribe(data => {
        let response = data.json();
        resolve(response.aggregations.groupby.buckets);
      }, err => {
        console.log(err);
      });
    });
  }

  getFilter(filter: any[] = []): number[] {
    let newFilter = filter;
    newFilter.push({
      "terms": {
        "cadena": this.cadenas
      }
    }
    );

    if (this.tiendas !== undefined && this.tiendas.length > 0)
      newFilter.push(
        {
          "terms": { "numctl": this.tiendas }
        })
 
    return newFilter;
  }
}