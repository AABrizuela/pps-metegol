import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoPartidosPage } from './listado-partidos.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoPartidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoPartidosPageRoutingModule {}
