import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopJugadoresPage } from './top-jugadores.page';

const routes: Routes = [
  {
    path: '',
    component: TopJugadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopJugadoresPageRoutingModule {}
