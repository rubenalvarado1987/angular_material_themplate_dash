import { Injectable} from '@angular/core';
import { DeptoModel} from './depto.model';
import { DeptoCuotaModel } from './depto-cuota.model';

@Injectable({
    providedIn: 'root'
  })
export class ResumenDeptoModel  {
  General:DeptoCuotaModel;
  Deptos : Array<DeptoCuotaModel> = [];
}
