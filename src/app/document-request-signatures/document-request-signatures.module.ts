import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../@shared/shared.module';
import { DocumentsRequestSignaturesWrapperComponent } from './documents-request-signatures-wrapper/documents-request-signatures-wrapper.component';
import { DocumentActionsComponent } from './document-actions/document-actions.component';
import { PublishDocumentModalComponent } from './publish-document-modal/publish-document-modal.component';
import { AddSignerModalComponent } from './add-signer-modal/add-signer-modal.component';

import { CommonLibModule } from '@canyaio/common-lib';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    CommonLibModule
  ],
  declarations: [
    DocumentsRequestSignaturesWrapperComponent,
    DocumentActionsComponent,
    PublishDocumentModalComponent,
    AddSignerModalComponent
  ]
})
export class DocumentRequestSignaturesModule { }
