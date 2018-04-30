import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../@shared/shared.module';
import { DocumentsRequestSignaturesWrapperComponent } from './documents-request-signatures-wrapper/documents-request-signatures-wrapper.component';
import { DocumentContentComponent } from './document-content/document-content.component';
import { DocumentActionsComponent } from './document-actions/document-actions.component';
import { PublishDocumentModalComponent } from './publish-document-modal/publish-document-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    DocumentsRequestSignaturesWrapperComponent,
    DocumentContentComponent,
    DocumentActionsComponent,
    PublishDocumentModalComponent
  ]
})
export class DocumentRequestSignaturesModule { }
