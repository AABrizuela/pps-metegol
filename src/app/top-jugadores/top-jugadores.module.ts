import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopJugadoresPageRoutingModule } from './top-jugadores-routing.module';

import { TopJugadoresPage } from './top-jugadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopJugadoresPageRoutingModule
  ],
  declarations: [TopJugadoresPage]
})
export class TopJugadoresPageModule {}
