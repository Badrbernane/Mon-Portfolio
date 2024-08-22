import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ChangeExperComponent } from './change-exper/change-exper.component';
import { ViewExperiencesComponent } from './view-experiences/view-experiences.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    ChangeExperComponent,
    ViewExperiencesComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class ExperiencesModule { }
