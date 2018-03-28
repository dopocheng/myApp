import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrianglePage } from './triangle';

@NgModule({
  declarations: [
    TrianglePage,
  ],
  imports: [
    IonicPageModule.forChild(TrianglePage),
  ],
})
export class TrianglePageModule {}
