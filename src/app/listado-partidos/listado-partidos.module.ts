import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoPartidosPageRoutingModule } from './listado-partidos-routing.module';

import { ListadoPartidosPage } from './listado-partidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoPartidosPageRoutingModule
  ],
  declarations: [ListadoPartidosPage]
})
export class ListadoPartidosPageModule {}
