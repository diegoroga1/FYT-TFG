import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VistaMapa } from './vista-mapa';

@NgModule({
  declarations: [
    VistaMapa,
  ],
  imports: [
    IonicPageModule.forChild(VistaMapa),
  ],
  exports: [
    VistaMapa
  ]
})
export class VistaMapaModule {}
