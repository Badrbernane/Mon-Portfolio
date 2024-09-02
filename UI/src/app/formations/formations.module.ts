import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewformationComponent } from './viewformation/viewformation.component';
import { ModifformationComponent } from './modifformation/modifformation.component';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    ViewformationComponent,
    ModifformationComponent,
    ConfirmDialogComponent
  ],
  imports: [
    SharedModule
  ]
})
export class FormationsModule { }
