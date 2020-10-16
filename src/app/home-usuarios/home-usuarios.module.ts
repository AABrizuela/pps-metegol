import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeUsuariosPageRoutingModule } from './home-usuarios-routing.module';

import { HomeUsuariosPage } from './home-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeUsuariosPageRoutingModule
  ],
  declarations: [HomeUsuariosPage]
})
export class HomeUsuariosPageModule {}
