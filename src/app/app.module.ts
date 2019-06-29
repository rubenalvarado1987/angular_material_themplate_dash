import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterModule } from './master.module';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MasterComponent } from './master.component';
import {TooltipModule} from 'ngx-tooltip';

 
import { AppRoutingModule } from './app-routing.module';
import { AppComercial } from './comercial/app.comercial';
import { AppOperacional } from './operacional/app.operacional';
import { BoxResumenComponent } from './pages/components/box-resumen/box-resumen.component';
import {  BoxItemsHeaderComponent } from './pages/components/box-items-header/box-items-header.component';
import { MsgBannerComponent } from './pages/aside/msg-banner/msg-banner.component';
import {  BoxItemsGridComponent } from './pages/components/box-items-grid/box-items-grid.component';
import { ArrowDirective } from './pages/directives/arrow.directive';
import { TextColorDirective } from './pages/directives/text-color.directive';
import { DetalleComponent } from './pages/components/gridview/detalle.component';
import { HeaderComponent } from './header/header/header.component';
import { BienvenidaComponent } from '@msg/bienvenida/bienvenida.component'; 
import { PointReplacerPipe } from '../pipes/point-replacer.pipe';

/* ANGULAR MATERIAL */
import { MatButtonModule, MatCheckboxModule, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatOptionModule, MatSelectModule, MatMenuModule, MatIconModule, MatSpinner, MatProgressSpinnerModule } from '@angular/material';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { OrderBy } from '@pipes/order.pipe';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { AppParisCL } from './paris-cl/app.paris-cl';
import { AppCadenaTxD } from './cadena-txd/app.cadena-txd';
 

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    AppComercial,
    AppOperacional,
    AppParisCL,
    AppCadenaTxD,
    MsgBannerComponent,
    TiendaComponent,
    BoxItemsHeaderComponent,
    BoxResumenComponent,
    BoxItemsGridComponent,
    ArrowDirective,
    TextColorDirective,
    PointReplacerPipe,
    OrderBy,
    DetalleComponent,
    HeaderComponent,
    BienvenidaComponent
  ],
  imports: [
    MasterModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    TooltipModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatSortModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgxDaterangepickerMd
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
