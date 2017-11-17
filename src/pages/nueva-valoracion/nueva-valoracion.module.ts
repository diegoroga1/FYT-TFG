import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaValoracionPage } from './nueva-valoracion';

@NgModule({
  declarations: [
    NuevaValoracionPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevaValoracionPage),
  ],
  exports: [
    NuevaValoracionPage
  ]
})
export class NuevaValoracionPageModule {}
