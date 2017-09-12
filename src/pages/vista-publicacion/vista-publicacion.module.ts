import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VistaPublicacion } from './vista-publicacion';

@NgModule({
  declarations: [
    VistaPublicacion,
  ],
  imports: [
    IonicPageModule.forChild(VistaPublicacion),
  ],
  exports: [
    VistaPublicacion
  ]
})
export class VistaPublicacionModule {}
