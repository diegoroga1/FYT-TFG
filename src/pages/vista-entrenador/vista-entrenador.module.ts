import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VistaEntrenador } from './vista-entrenador';

@NgModule({
  declarations: [
    VistaEntrenador,
  ],
  imports: [
    IonicPageModule.forChild(VistaEntrenador),
  ],
  exports: [
    VistaEntrenador
  ]
})
export class VistaEntrenadorModule {}
