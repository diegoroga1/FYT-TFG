import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaTarifa } from './nueva-tarifa';

@NgModule({
  declarations: [
    NuevaTarifa,
  ],
  imports: [
    IonicPageModule.forChild(NuevaTarifa),
  ],
  exports: [
    NuevaTarifa
  ]
})
export class NuevaTarifaModule {}
