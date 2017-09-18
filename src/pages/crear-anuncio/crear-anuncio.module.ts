import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearAnuncio } from './crear-anuncio';

@NgModule({
  declarations: [
    CrearAnuncio,
  ],
  imports: [
    IonicPageModule.forChild(CrearAnuncio),
  ],
  exports: [
    CrearAnuncio
  ]
})
export class CrearAnuncioModule {}
