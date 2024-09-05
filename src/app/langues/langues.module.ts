import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeLanguesComponent } from './change-langues/change-langues.component';
import { ViewLanguesComponent } from './view-langues/view-langues.component';
import { SharedModule } from '../shared/shared.module';
import { LangueNiveauDialogComponent } from './langue-niveau-dialog/langue-niveau-dialog.component';



@NgModule({
  declarations: [
    ChangeLanguesComponent,
    ViewLanguesComponent,
    LangueNiveauDialogComponent
  ],
  imports: [
    SharedModule
  ]
})
export class LanguesModule { }
