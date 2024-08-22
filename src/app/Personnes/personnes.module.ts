import { NgModule } from '@angular/core';
import { ViewPersonComponent } from './view-person/view-person.component';
import { SharedModule } from '../shared/shared.module';
import { PersoninfoComponent } from './personinfo/personinfo.component';
import { ModifpersonComponent } from './modifperson/modifperson.component';



@NgModule({
  declarations: [
    ViewPersonComponent,
    PersoninfoComponent,
    ModifpersonComponent
  ],
  imports: [
    SharedModule
  ]
})
export class PersonnesModule {}
