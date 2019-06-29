import { Injectable} from '@angular/core';
import { DeptoModel} from './depto.model';
import { BaseAggModel } from './base-agg.model';
import { ItemUpDown } from './Item-up-down.model';

@Injectable({
    providedIn: 'root'
  })
export class ResumenPorcModel  {
 sum_tsc_porc: number;
 diff_pct: number;
 ranking:number;
 items_up:ItemUpDown[]=[] ;
 items_down:ItemUpDown[]=[];
 Deptos : DeptoModel[] = [];
}
