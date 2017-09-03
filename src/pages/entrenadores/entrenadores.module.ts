import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Entrenadores } from './entrenadores';

@NgModule({
  declarations: [
    Entrenadores,
  ],
  imports: [
    IonicPageModule.forChild(Entrenadores),
  ],
  exports: [
    Entrenadores
  ]
})
export class EntrenadoresModule {}
