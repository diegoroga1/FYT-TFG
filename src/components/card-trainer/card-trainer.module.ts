import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CardTrainer } from './card-trainer';

@NgModule({
  declarations: [
    CardTrainer,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    CardTrainer
  ]
})
export class CardTrainerModule {}
