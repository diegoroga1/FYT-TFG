import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CardPubli } from './card-publi';

@NgModule({
  declarations: [
    CardPubli,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    CardPubli
  ]
})
export class CardPubliModule {}
