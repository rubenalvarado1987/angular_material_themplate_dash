import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { AppComercial } from './comercial/app.comercial';
import { AppOperacional } from './operacional/app.operacional';
import { AppParisCL } from './paris-cl/app.paris-cl';
import { AppCadenaTxD } from './cadena-txd/app.cadena-txd';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MasterComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: AppComercial
      }
    ]
  },
  {
   path: 'comercial',
   component: MasterComponent,
   children: [
     {
       outlet: 'master',
       path: '',
       component: AppComercial
     }
   ]
 },
 {
  path: 'paris/comercial',
  component: MasterComponent,
  children: [
    {
      outlet: 'master',
      path: '',
      component: AppComercial
    }
  ]
},
 {
  path: 'johnson/comercial',
  component: MasterComponent,
  children: [
    {
      outlet: 'master',
      path: '',
      component: AppComercial
    }
  ]
},
{
  path: 'paris-cl/comercial',
  component: MasterComponent,
  children: [
    {
      outlet: 'master',
      path: '',
      component: AppParisCL
    }
  ]
},

{
  path: 'paris/operacional',
  component: MasterComponent,
  children: [
    {
      outlet: 'master',
      path: '',
      component: AppOperacional
    }
  ]
},

{
  path: 'johnson/operacional',
  component: MasterComponent,
  children: [
    {
      outlet: 'master',
      path: '',
      component: AppOperacional
    }
  ]
},
{
  path: 'cadenas-txd',
  component: MasterComponent,
  children: [
    {
      outlet: 'master',
      path: '',
      component:  AppCadenaTxD
    }
  ]
},
{path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
