import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewCertificatComponent } from './view-certificat/view-certificat.component';
import { ChangeCertificatComponent } from './change-certificat/change-certificat.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    ViewCertificatComponent,
    ChangeCertificatComponent,
    ConfirmDialogComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CertficatModule {}
