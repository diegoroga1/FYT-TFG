import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MapComponent } from './map-component';

@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    MapComponent
  ]
})
export class MapComponentModule {}
