import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCompetenceComponent } from './view-competence/view-competence.component';
import { ChangeCompetenceComponent } from './change-competence/change-competence.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ViewCompetenceComponent,
    ChangeCompetenceComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CompétencesModule { }
