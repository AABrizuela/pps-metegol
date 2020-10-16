import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeUsuariosPage } from './home-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: HomeUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeUsuariosPageRoutingModule {}
