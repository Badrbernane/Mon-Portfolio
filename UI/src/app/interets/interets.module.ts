import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewInteretsComponent } from './view-interets/view-interets.component';
import { ChangeInteretsComponent } from './change-interets/change-interets.component';



@NgModule({
  declarations: [
    ViewInteretsComponent,
    ChangeInteretsComponent
  ],
  imports: [
    SharedModule
  ]
})
export class InteretsModule { }
