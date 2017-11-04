import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltrarEntrenadorPage } from './filtrar-entrenador';

@NgModule({
  declarations: [
    FiltrarEntrenadorPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltrarEntrenadorPage),
  ],
  exports: [
    FiltrarEntrenadorPage
  ]
})
export class FiltrarEntrenadorPageModule {}
