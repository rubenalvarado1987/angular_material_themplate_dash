
import { Injectable,Component, OnInit, Input } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })

export class GridviewDetalle {
  
    @Input() data: any = null;
    @Input() division: any = null;
}

