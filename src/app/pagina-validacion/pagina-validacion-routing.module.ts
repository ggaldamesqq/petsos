import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaValidacionPage } from './pagina-validacion.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaValidacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaValidacionPageRoutingModule {}
