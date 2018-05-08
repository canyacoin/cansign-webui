import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@shared/shared.module';
import { DocumentsSignWrapperComponent } from './documents-sign-wrapper/documents-sign-wrapper.component';
import { DocumentActionsComponent } from './document-actions/document-actions.component';
import { SignDocumentModalComponent } from './sign-document-modal/sign-document-modal.component';
import { DenySignatureModalComponent } from './deny-signature-modal/deny-signature-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [DocumentsSignWrapperComponent, DocumentActionsComponent, SignDocumentModalComponent, DenySignatureModalComponent]
})
export class DocumentSignModule { }
