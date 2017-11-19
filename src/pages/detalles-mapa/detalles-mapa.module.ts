import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallesMapaPage } from './detalles-mapa';

@NgModule({
  declarations: [
    DetallesMapaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallesMapaPage),
  ],
  exports: [
    DetallesMapaPage
  ]
})
export class DetallesMapaPageModule {}
