import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeProjectComponent } from './change-project/change-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    ChangeProjectComponent,
    ViewProjectComponent,
    ConfirmDialogComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ProjetsModule { }
