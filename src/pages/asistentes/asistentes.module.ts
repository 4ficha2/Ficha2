import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AsistentesPage } from './asistentes';

@NgModule({
  declarations: [
    AsistentesPage,
  ],
  imports: [
    IonicPageModule.forChild(AsistentesPage),
  ],
})
export class AsistentesPageModule {}
