import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  { path: 'splash', loadChildren: () => import('./app.component').then( m => m.AppComponent)},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home-usuarios',
    loadChildren: () => import('./home-usuarios/home-usuarios.module').then( m => m.HomeUsuariosPageModule)
  },
  {
    path: 'partido',
    loadChildren: () => import('./partido/partido.module').then( m => m.PartidoPageModule)
  },
  {
    path: 'listado-partidos',
    loadChildren: () => import('./listado-partidos/listado-partidos.module').then( m => m.ListadoPartidosPageModule)
  },
  {
    path: 'top-jugadores',
    loadChildren: () => import('./top-jugadores/top-jugadores.module').then( m => m.TopJugadoresPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
