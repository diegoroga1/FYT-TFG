import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearPublicacion } from './crear-publicacion';

@NgModule({
  declarations: [
    CrearPublicacion,
  ],
  imports: [
    IonicPageModule.forChild(CrearPublicacion),
  ],
  exports: [
    CrearPublicacion
  ]
})
export class CrearPublicacionModule {}
